<?php
require_once 'db.php';

$username = "admin";
$email = "admin@ksdrelow.pl";
$password = password_hash("Admin123!", PASSWORD_DEFAULT);
$role = "admin";

$stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $email, $password, $role);

if ($stmt->execute()) {
  echo "✅ Administrator został utworzony.";
} else {
  echo "❌ Błąd: " . $conn->error;
}
$stmt->close();
