<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// 🔹 Połączenie z bazą
$host = "localhost";
$user = "root";
$pass = "root"; // jeśli MAMP
$db = "ks_drelow";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Błąd połączenia z bazą danych."]);
  exit;
}

// 🔹 Pobranie danych z JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
  echo json_encode(["status" => "error", "message" => "Nieprawidłowe dane wejściowe."]);
  exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = trim($data['password']);

// 🔹 Walidacja podstawowa
if ($name === "" || $email === "" || $password === "") {
  echo json_encode(["status" => "error", "message" => "Wszystkie pola są wymagane."]);
  exit;
}

// 🔹 Sprawdź, czy email już istnieje
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
  echo json_encode(["status" => "error", "message" => "Ten e-mail jest już zarejestrowany."]);
  $check->close();
  $conn->close();
  exit;
}
$check->close();

// 🔹 Hashowanie hasła
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// 🔹 Dodaj użytkownika do bazy
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "Rejestracja zakończona pomyślnie!"]);
} else {
  echo json_encode(["status" => "error", "message" => "Nie udało się zarejestrować użytkownika."]);
}

$stmt->close();
$conn->close();
?>
