<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$name = htmlspecialchars($data['name'] ?? '');
$email = htmlspecialchars($data['email'] ?? '');
$message = htmlspecialchars($data['message'] ?? '');

if (!$name || !$email || !$message) {
  echo json_encode(["status" => "error", "message" => "Brak danych."]);
  exit;
}

$mail = new PHPMailer(true);

try {
  // ✅ Gmail SMTP configuration
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'alexwrobel220103@gmail.com'; // 🔹 Twój Gmail
  $mail->Password = 'oaymcgmcymionmba';  // 🔹 16-znakowe hasło z Google
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';

  // Nadawca i odbiorca
  $mail->setFrom('alexwrobel220103@gmail.com', 'Formularz KS Drelów');
  $mail->addAddress('alexwrobel220103@gmail.com', 'KS Drelów');

  // Treść wiadomości
  $mail->isHTML(true);
  $mail->Subject = "📩 Nowa wiadomość z formularza";
  $mail->Body = "
  <html>
    <body style='font-family: Arial, sans-serif;'>
      <h2>📬 Nowa wiadomość z formularza kontaktowego</h2>
      <p><strong>Imię:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Wiadomość:</strong><br>{$message}</p>
    </body>
  </html>
  ";

  $mail->send();
  echo json_encode(["status" => "success", "message" => "Wiadomość wysłana pomyślnie!"]);

} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => "Błąd PHPMailer: {$mail->ErrorInfo}"]);
}
?>
