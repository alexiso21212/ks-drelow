<?php
// 🔍 Włącz wyświetlanie błędów PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 🔹 Połączenie z bazą danych KS Drelów
$host = "localhost";
$user = "root";
$pass = "root";        // domyślne hasło MAMP
$dbname = "ks_drelow";
$port = 8889;          // domyślny port MySQL w MAMP

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("❌ Błąd połączenia z bazą danych: " . $conn->connect_error);
}
?>
