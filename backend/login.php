<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("db.php");

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input["email"]) || !isset($input["password"])) {
    echo json_encode(["status" => "error", "message" => "Nieprawidłowe żądanie."]);
    exit;
}

$email = $conn->real_escape_string($input["email"]);
$password = $input["password"];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $user["id"],
                "username" => $user["username"],
                "email" => $user["email"],
                "role" => $user["role"]
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowe hasło."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Nie znaleziono użytkownika."]);
}

$conn->close();
?>
