<?php
require_once 'db.php';

$res = $conn->query("SELECT id, name, position, age, number, image, description FROM players ORDER BY created_at DESC");
$players = [];
while ($row = $res->fetch_assoc()) {
  $players[] = $row;
}
echo json_encode($players);
