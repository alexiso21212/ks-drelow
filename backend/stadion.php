<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once "config.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    // 🔹 Pobieranie opisu i zdjęć stadionu
    $sqlOpis = "SELECT opis FROM stadion_opis LIMIT 1";
    $sqlZdjecia = "SELECT * FROM stadion_zdjecia ORDER BY id DESC";

    $opisResult = $conn->query($sqlOpis);
    $zdjeciaResult = $conn->query($sqlZdjecia);

    $opis = $opisResult ? ($opisResult->fetch_assoc()["opis"] ?? "") : "";
    $zdjecia = [];

    if ($zdjeciaResult) {
      while ($row = $zdjeciaResult->fetch_assoc()) {
        $zdjecia[] = $row;
      }
    }

    echo json_encode(["opis" => $opis, "zdjecia" => $zdjecia]);
    break;

  case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);

    // 🔹 Aktualizacja opisu stadionu
    if (isset($data["action"]) && $data["action"] === "updateOpis") {
      $opis = $conn->real_escape_string($data["opis"]);
      $conn->query("UPDATE stadion_opis SET opis='$opis' LIMIT 1");
      echo json_encode(["status" => "success", "message" => "Opis stadionu zaktualizowany"]);
    }

    // 🔹 Dodanie nowego zdjęcia
    elseif (isset($data["image_url"]) && !isset($data["action"])) {
      $url = $conn->real_escape_string($data["image_url"]);
      $opisZdjecia = isset($data["opis"]) ? $conn->real_escape_string($data["opis"]) : "";
      
      if (!empty($url)) {
        $conn->query("INSERT INTO stadion_zdjecia (image_url, opis) VALUES ('$url', '$opisZdjecia')");
        echo json_encode(["status" => "success", "message" => "Zdjęcie dodane"]);
      } else {
        echo json_encode(["status" => "error", "message" => "Brak adresu URL zdjęcia"]);
      }
    }

    // 🔹 Edycja istniejącego zdjęcia
    elseif (isset($data["action"]) && $data["action"] === "updateZdjecie") {
      $id = intval($data["id"]);
      $url = $conn->real_escape_string($data["image_url"]);
      $opis = $conn->real_escape_string($data["opis"]);
      $conn->query("UPDATE stadion_zdjecia SET image_url='$url', opis='$opis' WHERE id=$id");
      echo json_encode(["status" => "success", "message" => "Zdjęcie stadionu zaktualizowane"]);
    }

    break;

  case 'DELETE':
    $id = $_GET["id"] ?? null;
    if ($id) {
      $conn->query("DELETE FROM stadion_zdjecia WHERE id=$id");
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
