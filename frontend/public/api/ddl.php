<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'db.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

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