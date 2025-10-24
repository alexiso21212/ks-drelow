<?php
error_reporting(0);
ini_set('display_errors', 0);

// ====== CORS ======
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// ====== Połączenie z bazą ======
$host = "localhost";
$user = "root";       // domyślnie w MAMP
$pass = "root";       // domyślnie w MAMP
$dbname = "ks_drelow"; // <-- Twoja baza danych

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Błąd połączenia z bazą danych"]);
  exit;
}

// ====== Pobieranie danych z JSON ======
$input = json_decode(file_get_contents("php://input"), true);
$email = $input["email"] ?? "";
$password = $input["password"] ?? "";

if (!$email || !$password) {
  echo json_encode(["status" => "error", "message" => "Brak danych logowania"]);
  exit;
}

// ====== Wyszukiwanie użytkownika ======
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["status" => "error", "message" => "Nie znaleziono użytkownika"]);
  exit;
}

$user = $result->fetch_assoc();

// ====== Weryfikacja hasła ======
if (password_verify($password, $user["password"])) {
    echo json_encode([
      "status" => "success",
      "message" => "Zalogowano pomyślnie",
      "user" => [
        "id" => $user["id"],
        "name" => $user["name"],
        "email" => $user["email"],
        "role" => $user["role"]
      ]
    ]);
  }
   else {
  echo json_encode(["status" => "error", "message" => "Nieprawidłowe hasło"]);
}

$conn->close();
?>
