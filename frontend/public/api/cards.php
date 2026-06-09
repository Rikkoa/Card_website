<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'db.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if ($method === 'GET' && !isset($_GET['search']) && !isset($_GET['distribution'])) {
    // 獲取所有卡牌
    $stmt = $pdo->query("SELECT * FROM cards ORDER BY card_id");
    echo json_encode($stmt->fetchAll());
}

elseif ($method === 'GET' && isset($_GET['search'])) {
    $card_id = $_GET['search'];
    $stmt = $pdo->prepare("SELECT * FROM cards WHERE card_id = ?");
    $stmt->execute([$card_id]);
    $card = $stmt->fetch();

    if (!$card) {
        http_response_code(404);
        echo json_encode(["error" => "卡牌不存在"]);
        exit;
    }

    // 統計同類型卡牌
    $stats = $pdo->prepare("
        SELECT SUM(card_quantity) as total_count,
            SUM(CASE WHEN card_score > ? THEN card_quantity END) as higher_count,
            SUM(CASE WHEN card_score = ? THEN card_quantity END) as same_count,
            MAX(card_name) as display_name
        FROM cards 
        WHERE LOWER(
                REPLACE(
                    REPLACE(
                        REPLACE(TRIM(card_name), ' ', ''),
                        '\n', ''
                    ),
                    '\r', ''
                )
            ) = LOWER(
                REPLACE(
                    REPLACE(
                        REPLACE(TRIM(?), ' ', ''),
                        '\n', ''
                    ),
                    '\r', ''
                )
            )
    ");
    $stats->execute([$card['card_score'], $card['card_score'], $card['card_name']]);
    $statsData = $stats->fetch();

    $card['statistics'] = [
        "total_same_type" => (int)$statsData['total_count'],
        "higher_score_count" => (int)$statsData['higher_count'],
        "same_score_count" => (int)$statsData['same_count']
    ];

    echo json_encode($card);
}if ($method === 'GET' && isset($_GET['distribution'])) {
    $card_id = $_GET['distribution'];

    if (empty($card_id)) {
        http_response_code(400);
        echo json_encode(["error" => "請提供卡牌編號"]);
        exit;
    }

    try {
        // 先查詢卡牌名稱
        $stmt = $pdo->prepare("SELECT card_name FROM cards WHERE card_id = ?");
        $stmt->execute([$card_id]);
        $cardResult = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$cardResult) {
            http_response_code(404);
            echo json_encode(["error" => "卡牌不存在"]);
            exit;
        }

        $cardType = $cardResult['card_name'];

        // 查詢分數分佈
        $sql = "
            SELECT ROUND(card_score, 1) AS card_score,
                   SUM(card_quantity) AS count
            FROM cards
            WHERE LOWER(
                REPLACE(
                    REPLACE(
                        REPLACE(TRIM(card_name), ' ', ''),
                        '\n', ''
                    ),
                    '\r', ''
                )
            ) = LOWER(
                REPLACE(
                    REPLACE(
                        REPLACE(TRIM(?), ' ', ''),
                        '\n', ''
                    ),
                    '\r', ''
                )
            )
            GROUP BY ROUND(card_score, 1)
            ORDER BY card_score DESC
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$cardType]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($rows);
    } catch (Exception $e) {
        error_log("獲取分數分佈錯誤: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["error" => "服務器錯誤"]);
    }
}

elseif (isset($_GET['dropdown'])) {
    if ($method === 'GET') {
        // 取得所有 dropdown options
        $stmt = $pdo->query("SELECT * FROM dropdown_options ORDER BY id ASC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    elseif ($method === 'POST') {
    $stmt = $pdo->prepare("INSERT INTO dropdown_options (score, description) VALUES (?, ?)");
    $stmt->execute([$input['score'], $input['description']]);

    $rows = $pdo->query("SELECT * FROM dropdown_options ORDER BY id ASC")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
    }

    elseif ($method === 'PUT') {
        parse_str($_SERVER['QUERY_STRING'], $params);
        $id = $params['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode([]);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE dropdown_options SET score=?, description=?, updated_at=NOW() WHERE id=?");
        $stmt->execute([$input['score'], $input['description'], $id]);

        $rows = $pdo->query("SELECT * FROM dropdown_options ORDER BY id ASC")->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }

    elseif ($method === 'DELETE') {
        parse_str($_SERVER['QUERY_STRING'], $params);
        $id = $params['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode([]);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM dropdown_options WHERE id=?");
        $stmt->execute([$id]);

        $rows = $pdo->query("SELECT * FROM dropdown_options ORDER BY id ASC")->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }

}
elseif ($method === 'POST') {
    // 添加卡牌
    $stmt = $pdo->prepare("
        INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $input['card_id'], $input['card_name'], $input['card_level'], $input['card_score'],
        $input['card_quantity'], $input['image_url1'], $input['image_url2'], $input['image_url3'], $input['card_type']
    ]);
    echo json_encode(["success" => true, "message" => "卡牌新增成功"]);
}

elseif ($method === 'PUT') {
    // 更新卡牌
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    $stmt = $pdo->prepare("
        UPDATE cards SET card_id=?, card_name=?, card_level=?, card_score=?, card_quantity=?,
        image_url1=?, image_url2=?, image_url3=?, card_type=?, updated_at=NOW()
        WHERE id=?
    ");
    $stmt->execute([
        $input['card_id'], $input['card_name'], $input['card_level'], $input['card_score'],
        $input['card_quantity'], $input['image_url1'], $input['image_url2'], $input['image_url3'], $input['card_type'], $id
    ]);
    echo json_encode(["success" => true, "message" => "卡牌更新成功"]);
}

elseif ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    $stmt = $pdo->prepare("DELETE FROM cards WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true, "message" => "卡牌刪除成功"]);
}