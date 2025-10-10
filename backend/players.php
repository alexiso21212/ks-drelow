<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("db.php");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT * FROM players ORDER BY id DESC";
    $result = $conn->query($sql);
    $players = [];

    while ($row = $result->fetch_assoc()) {
        $players[] = $row;
    }

    echo json_encode($players);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input["name"]) || !isset($input["position"])) {
        echo json_encode(["status" => "error", "message" => "Brak wymaganych danych."]);
        exit;
    }

        $name = $conn->real_escape_string($input["name"]);
    $position = $conn->real_escape_string($input["position"]);
    $number = intval($input["number"]);
    $age = intval($input["age"]);
    $image = $conn->real_escape_string($input["image"]);
    $role = $conn->real_escape_string($input["role"]);

$sql = "INSERT INTO players (name, position, number, age, image, role)
        VALUES ('$name', '$position', '$number', '$age', '$image', '$role')";


    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Zawodnik dodany pomyślnie!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Błąd zapisu: " . $conn->error]);
    }
    exit;
}

if ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $input);
    $id = (int)$input['id'];
    $sql = "DELETE FROM players WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Zawodnik usunięty."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Nie udało się usunąć."]);
    }
    exit;
}

$conn->close();
?>
