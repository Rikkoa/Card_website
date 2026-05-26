<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$cardCount = $data['cardCount'] ?? '';
$question = $data['question'] ?? '';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'peterpanntinkerbellz@gmail.com';
    $mail->Password   = 'lhalwajugvvrzwdy';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('peterpanntinkerbellz@gmail.com', 'Contact Form');
    $mail->addAddress('peterpanntinkerbellz@gmail.com', 'Admin');

    $mail->isHTML(true);
    $mail->Subject = "New Request from Contact Form";
    $mail->Body    = "
        <h3>聯絡表單資料</h3>
        <p><b>名字:</b> $name</p>
        <p><b>電話:</b> $phone</p>
        <p><b>電郵:</b> $email</p>
        <p><b>評核卡數量:</b> $cardCount</p>
        <p><b>詳細查詢:</b> $question</p>
    ";

    $mail->send();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $mail->ErrorInfo]);
}
