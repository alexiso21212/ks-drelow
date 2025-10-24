<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


$file = "matches.json";

if (!file_exists($file)) {
  file_put_contents($file, json_encode([]));
}

$matches = json_decode(file_get_contents($file), true);

// GET – pobierz mecze
if ($_SERVER["REQUEST_METHOD"] === "GET") {
  echo json_encode($matches);
  exit;
}

// POST – dodaj lub edytuj
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  if (isset($data["action"]) && $data["action"] === "update") {
    foreach ($matches as &$match) {
      if ($match["id"] == $data["id"]) {
        $match = $data;
        file_put_contents($file, json_encode($matches, JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Mecz został zaktualizowany ✅"]);
        exit;
      }
    }
  }

  // Nowy mecz
  $newMatch = [
    "id" => uniqid(),
    "round" => $data["round"] ?? "",
    "date" => $data["date"] ?? "",
    "time" => $data["time"] ?? "",
    "home_team" => $data["home_team"] ?? "",
    "away_team" => $data["away_team"] ?? "",
    "location" => $data["location"] ?? "",
    "score" => $data["score"] ?? ""
  ];

  $matches[] = $newMatch;
  file_put_contents($file, json_encode($matches, JSON_PRETTY_PRINT));
  echo json_encode(["message" => "Nowy mecz został dodany ✅"]);
  exit;
}

// DELETE – usuń mecz
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  if (!isset($_GET["id"])) {
    echo json_encode(["message" => "Brak ID meczu"]);
    exit;
  }

  $id = $_GET["id"];
  $matches = array_filter($matches, fn($m) => $m["id"] !== $id);
  file_put_contents($file, json_encode(array_values($matches), JSON_PRETTY_PRINT));
  echo json_encode(["message" => "Mecz został usunięty 🗑️"]);
  exit;
}
