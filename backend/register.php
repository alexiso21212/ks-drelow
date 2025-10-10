<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("db.php");

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input["username"]) || !isset($input["email"]) || !isset($input["password"])) {
    echo json_encode(["status" => "error", "message" => "Nieprawidłowe dane wejściowe."]);
    exit;
}

$username = $conn->real_escape_string(trim($input["username"]));
$email = $conn->real_escape_string(trim($input["email"]));
$password = trim($input["password"]);

$check = $conn->query("SELECT id FROM users WHERE email='$email'");
if ($check && $check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Użytkownik o tym adresie e-mail już istnieje."]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$hashed', 'user')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Rejestracja zakończona sukcesem!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Błąd: " . $conn->error]);
}

$conn->close();
?>
