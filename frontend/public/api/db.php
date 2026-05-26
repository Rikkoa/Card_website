<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 環境變數可用 getenv() 或直接寫死
$host = 'localhost';
$port = '3306';
$dbname = 'hkgcardz01';
$user = 'hkgcardz';
$password = 'Abc@123456';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "資料庫連線失敗: " . $e->getMessage()]);
    exit;
}
