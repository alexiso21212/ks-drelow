<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


require_once "db.php";

// 🔹 Obsługa preflight (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// 🔹 Pobierz dane z JSON
$data = json_decode(file_get_contents("php://input"), true);
$action = $data["action"] ?? "add"; // domyślnie dodawanie

// =========================
// 🔹 POBIERZ LISTĘ AKTUALNOŚCI
// =========================
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $result = $conn->query("SELECT * FROM news ORDER BY id DESC");
    $news = [];

    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }

    echo json_encode($news);
    exit;
}

// =========================
// 🔹 DODAJ / AKTUALIZUJ AKTUALNOŚĆ
// =========================
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $conn->real_escape_string($data["title"] ?? "");
    $content = $conn->real_escape_string($data["content"] ?? "");
    $image = $conn->real_escape_string($data["image"] ?? "");

    // 🔸 AKTUALIZACJA
    if ($action === "update") {
        $id = (int)($data["id"] ?? 0);
        if ($id <= 0) {
            echo json_encode(["message" => "❌ Brak ID aktualności do aktualizacji."]);
            exit;
        }

        $query = "UPDATE news SET title='$title', content='$content', image='$image' WHERE id=$id";
        if ($conn->query($query)) {
            echo json_encode(["message" => "✅ Aktualność została zaktualizowana."]);
        } else {
            echo json_encode(["message" => "❌ Błąd podczas aktualizacji."]);
        }
        exit;
    }

    // 🔸 DODAWANIE
    $query = "INSERT INTO news (title, content, image)
              VALUES ('$title', '$content', '$image')";

    if ($conn->query($query)) {
        echo json_encode(["message" => "✅ Aktualność dodana pomyślnie."]);
    } else {
        echo json_encode(["message" => "❌ Błąd podczas dodawania."]);
    }
    exit;
}

// =========================
// 🔹 USUŃ AKTUALNOŚĆ
// =========================
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    parse_str($_SERVER["QUERY_STRING"], $query);
    $id = (int)($query["id"] ?? 0);

    if ($id > 0) {
        $conn->query("DELETE FROM news WHERE id=$id");
        echo json_encode(["message" => "🗑️ Aktualność została usunięta."]);
    } else {
        echo json_encode(["message" => "❌ Brak ID aktualności."]);
    }
    exit;
}

echo json_encode(["message" => "❌ Nieprawidłowe żądanie."]);
?>
