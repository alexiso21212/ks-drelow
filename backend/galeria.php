<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once("config.php");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    // 🔹 Pobranie wszystkich zdjęć galerii
    $result = $conn->query("SELECT * FROM galeria ORDER BY id DESC");
    $zdjecia = [];
    while ($row = $result->fetch_assoc()) {
        $zdjecia[] = $row;
    }
    echo json_encode($zdjecia);
    break;

  case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);

    // 🔹 Dodawanie nowego zdjęcia
    if (!isset($data["action"])) {
      $url = $conn->real_escape_string($data["image_url"]);
      $opis = isset($data["opis_zdjecia"]) ? $conn->real_escape_string($data["opis_zdjecia"]) : "";

      if (!empty($url)) {
        $conn->query("INSERT INTO galeria (image_url, opis_zdjecia) VALUES ('$url', '$opis')");
        echo json_encode(["status" => "success", "message" => "Zdjęcie dodane"]);
      } else {
        echo json_encode(["status" => "error", "message" => "Brak adresu URL"]);
      }
    }

    // 🔹 Edycja istniejącego zdjęcia
    elseif ($data["action"] === "updateGaleria") {
      $id = intval($data["id"]);
      $url = $conn->real_escape_string($data["image_url"]);
      $opis = $conn->real_escape_string($data["opis_zdjecia"]);
      $conn->query("UPDATE galeria SET image_url='$url', opis_zdjecia='$opis' WHERE id=$id");
      echo json_encode(["status" => "success", "message" => "Zdjęcie z galerii zaktualizowane"]);
    }

    break;

  case 'DELETE':
    if (isset($_GET["id"])) {
      $id = intval($_GET["id"]);
      $conn->query("DELETE FROM galeria WHERE id=$id");
      echo json_encode(["status" => "success", "message" => "Zdjęcie usunięte"]);
    } else {
      echo json_encode(["status" => "error", "message" => "Brak ID"]);
    }
    break;

  case 'OPTIONS':
    http_response_code(200);
    break;
}

$conn->close();
?>
