<?php
session_start();

// ✅ Pełne nagłówki CORS – pozwalają na połączenie z React (localhost:3000 lub 3001)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// 🔹 Obsługa preflight (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// 🔹 Połączenie z bazą
require_once "db.php";

// ✅ Na czas developmentu — admin zawsze aktywny
$_SESSION['role'] = 'admin';

// =======================================================
//  GET — Pobierz wszystkich zawodników
// =======================================================
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $players = [];
    $result = $conn->query("SELECT * FROM players ORDER BY id ASC");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $players[] = $row;
        }
    }

    echo json_encode($players);
    exit;
}

// =======================================================
//  POST — Dodaj nowego lub zaktualizuj istniejącego
// =======================================================
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $conn->real_escape_string($data['name'] ?? '');
    $position = $conn->real_escape_string($data['position'] ?? '');
    $number = isset($data['number']) ? (int)$data['number'] : 0;
    $age = isset($data['age']) ? (int)$data['age'] : 0;
    $image = $conn->real_escape_string($data['image'] ?? '');
    $role = $conn->real_escape_string($data['role'] ?? 'player');
    $team = $conn->real_escape_string($data['team'] ?? '');

    // 🔹 AKTUALIZACJA
    if (isset($data['action']) && $data['action'] === 'update') {
        $id = (int)$data['id'];
        $query = "UPDATE players 
                  SET name='$name', position='$position', number=$number, age=$age, image='$image', role='$role', team='$team'
                  WHERE id=$id";

        if ($conn->query($query)) {
            echo json_encode(["status" => "success", "message" => "✅ Zawodnik zaktualizowany."]);
        } else {
            echo json_encode(["status" => "error", "message" => "❌ Błąd podczas aktualizacji."]);
        }
        exit;
    }

    // 🔹 DODAWANIE
    $query = "INSERT INTO players (name, position, number, age, image, role, team) 
              VALUES ('$name', '$position', $number, $age, '$image', '$role', '$team')";

    if ($conn->query($query)) {
        echo json_encode(["status" => "success", "message" => "✅ Zawodnik dodany."]);
    } else {
        echo json_encode(["status" => "error", "message" => "❌ Błąd podczas dodawania."]);
    }
    exit;
}

// =======================================================
//  DELETE — Usuń zawodnika
// =======================================================
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    parse_str($_SERVER["QUERY_STRING"], $query);
    $id = isset($query["id"]) ? (int)$query["id"] : 0;

    if ($id > 0) {
        $delete = $conn->query("DELETE FROM players WHERE id = $id");
        if ($delete) {
            echo json_encode(["status" => "success", "message" => "✅ Zawodnik został usunięty."]);
        } else {
            echo json_encode(["status" => "error", "message" => "❌ Błąd podczas usuwania."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowe ID."]);
    }
    exit;
}

// =======================================================
//  Domyślna odpowiedź
// =======================================================
http_response_code(400);
echo json_encode(["status" => "error", "message" => "Nieprawidłowe żądanie."]);
exit;
?>
