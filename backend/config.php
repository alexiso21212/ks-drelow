<?php
$servername = "localhost";
$username = "root";
$password = "root"; // w MAMP to zawsze 'root'
$dbname = "ks_drelow"; // nazwa Twojej bazy danych
$port = 8889; // w MAMP domyślnie 8889

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
  die(json_encode([
    "status" => "error",
    "message" => "Błąd połączenia z bazą danych: " . $conn->connect_error
  ]));
}
?>
