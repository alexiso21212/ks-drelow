<?php
require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

$name = trim($input['name'] ?? '');
$position = trim($input['position'] ?? '');
$age = intval($input['age'] ?? 0);
$number = intval($input['number'] ?? 0);
$image = trim($input['image'] ?? '');
$description = trim($input['description'] ?? '');

if (!$name) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Brak imienia/nazwiska"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO players (name, position, age, number, image, description) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssiiss", $name, $position, $age, $number, $image, $description);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success","id"=>$conn->insert_id]);
} else {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>$conn->error]);
}
$stmt->close();
