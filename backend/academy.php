<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


$servername = "localhost";
$username = "root";
$password = "root"; // lub "" jeśli używasz XAMPP
$dbname = "ks_drelow"; // 🟡 ZMIEŃ na nazwę swojej bazy danych

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die(json_encode(["error" => "Database connection failed"]));
}

$method = $_SERVER["REQUEST_METHOD"];

// ======================
// 📦 POBIERANIE ZAWODNIKÓW
// ======================
if ($method === "GET") {
  $sql = "SELECT * FROM academy ORDER BY id DESC";
  $result = $conn->query("SELECT * FROM academy ORDER BY SUBSTRING_INDEX(name, ' ', -1) ASC");
  $players = [];
  while ($row = $result->fetch_assoc()) {
    $players[] = $row;
  }
  echo json_encode($players);
  exit;
}

// ======================
// ➕ DODAWANIE ZAWODNIKA
// ======================
if ($method === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  if (isset($data["action"]) && $data["action"] === "update") {
    // 🔹 Aktualizacja zawodnika
    $id = intval($data["id"]);
    $name = $conn->real_escape_string($data["name"]);
    $team = $conn->real_escape_string($data["team"]);

    $sql = "UPDATE academy SET name='$name', team='$team' WHERE id=$id";
    if ($conn->query($sql)) {
      echo json_encode(["message" => "✅ Zawodnik zaktualizowany"]);
    } else {
      echo json_encode(["error" => "❌ Błąd aktualizacji"]);
    }
    exit;
  }

  // 🔹 Dodawanie nowego zawodnika
  $name = $conn->real_escape_string($data["name"]);
  $team = $conn->real_escape_string($data["team"]);

  if (empty($name) || empty($team)) {
    echo json_encode(["error" => "Wymagane pola"]);
    exit;
  }

  $sql = "INSERT INTO academy (name, team) VALUES ('$name', '$team')";
  if ($conn->query($sql)) {
    echo json_encode(["message" => "✅ Zawodnik dodany"]);
  } else {
    echo json_encode(["error" => "❌ Błąd dodawania"]);
  }
  exit;
}

// ======================
// 🗑️ USUWANIE ZAWODNIKA
// ======================
if ($method === "DELETE") {
  parse_str($_SERVER["QUERY_STRING"], $params);
  $id = intval($params["id"]);
  $sql = "DELETE FROM academy WHERE id=$id";
  if ($conn->query($sql)) {
    echo json_encode(["message" => "🗑️ Zawodnik usunięty"]);
  } else {
    echo json_encode(["error" => "❌ Błąd usuwania"]);
  }
  exit;
}

$conn->close();
