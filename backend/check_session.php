<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "logged_in" => true,
        "user_id" => $_SESSION['user_id'],
        "role" => $_SESSION['role'] ?? "brak",
        "username" => $_SESSION['username'] ?? "brak"
    ]);
} else {
    echo json_encode(["logged_in" => false]);
}
