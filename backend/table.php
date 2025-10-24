<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


// 🔹 Połączenie z bazą danych
$host = "localhost";
$user = "root";
$pass = "root"; // MAMP domyślnie
$dbname = "ks_drelow";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die(json_encode(["error" => "❌ Błąd połączenia z bazą danych: " . $conn->connect_error]));
}

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {

  // =============================
  // 🔹 POBIERZ TABELĘ
  // =============================
  case "GET":
    $result = $conn->query("SELECT * FROM league_table ORDER BY points DESC, (goals_for - goals_against) DESC, team_name ASC");
    $rows = [];
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }

    // automatyczna numeracja miejsc
    $pos = 1;
    foreach ($rows as &$team) {
      $team["position"] = $pos++;
    }

    echo json_encode($rows);
    break;

  // =============================
  // 🔹 DODAJ DRUŻYNĘ LUB ZAKTUALIZUJ WYNIK
  // =============================
  case "POST":
    $data = json_decode(file_get_contents("php://input"), true);

    // 🏆 Aktualizacja wyniku meczu
    if (isset($data["action"]) && $data["action"] === "updateScore") {
      $home = $conn->real_escape_string($data["home_team"]);
      $away = $conn->real_escape_string($data["away_team"]);
      list($homeGoals, $awayGoals) = explode(":", $data["score"]);

      // Pobierz dane drużyn
      $homeTeam = $conn->query("SELECT * FROM league_table WHERE team_name='$home'")->fetch_assoc();
      $awayTeam = $conn->query("SELECT * FROM league_table WHERE team_name='$away'")->fetch_assoc();

      if (!$homeTeam || !$awayTeam) {
        echo json_encode(["error" => "Nie znaleziono jednej z drużyn w tabeli."]);
        break;
      }

      // Aktualizuj mecze
      $homeTeam["matches_played"]++;
      $awayTeam["matches_played"]++;

      // Bramki
      $homeTeam["goals_for"] += (int)$homeGoals;
      $homeTeam["goals_against"] += (int)$awayGoals;
      $awayTeam["goals_for"] += (int)$awayGoals;
      $awayTeam["goals_against"] += (int)$homeGoals;

      // Punkty
      if ($homeGoals > $awayGoals) {
        $homeTeam["wins"]++;
        $awayTeam["losses"]++;
        $homeTeam["points"] += 3;
      } elseif ($homeGoals < $awayGoals) {
        $awayTeam["wins"]++;
        $homeTeam["losses"]++;
        $awayTeam["points"] += 3;
      } else {
        $homeTeam["draws"]++;
        $awayTeam["draws"]++;
        $homeTeam["points"]++;
        $awayTeam["points"]++;
      }

      // Zaktualizuj obie drużyny w bazie
      $update = $conn->prepare("UPDATE league_table 
        SET matches_played=?, wins=?, draws=?, losses=?, goals_for=?, goals_against=?, points=? 
        WHERE team_name=?");

      $update->bind_param(
        "iiiiiiis",
        $homeTeam["matches_played"],
        $homeTeam["wins"],
        $homeTeam["draws"],
        $homeTeam["losses"],
        $homeTeam["goals_for"],
        $homeTeam["goals_against"],
        $homeTeam["points"],
        $home
      );
      $update->execute();

      $update->bind_param(
        "iiiiiiis",
        $awayTeam["matches_played"],
        $awayTeam["wins"],
        $awayTeam["draws"],
        $awayTeam["losses"],
        $awayTeam["goals_for"],
        $awayTeam["goals_against"],
        $awayTeam["points"],
        $away
      );
      $update->execute();

      echo json_encode(["message" => "✅ Wynik dodany i tabela zaktualizowana."]);
      break;
    }

    // 🆕 Dodaj nową drużynę
    $stmt = $conn->prepare("INSERT INTO league_table 
      (position, logo, team_name, matches_played, wins, draws, losses, goals_for, goals_against, points)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
      "issiiiiiii",
      $data["position"],
      $data["logo"],
      $data["team_name"],
      $data["matches_played"],
      $data["wins"],
      $data["draws"],
      $data["losses"],
      $data["goals_for"],
      $data["goals_against"],
      $data["points"]
    );
    $stmt->execute();

    echo json_encode(["message" => "✅ Dodano drużynę do tabeli."]);
    break;

  // =============================
  // 🔹 AKTUALIZUJ DRUŻYNĘ (PUT)
  // =============================
  case "PUT":
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"] ?? null;
    if (!$id) {
      echo json_encode(["error" => "Brak ID."]);
      break;
    }

    $stmt = $conn->prepare("UPDATE league_table SET 
      position=?, logo=?, team_name=?, matches_played=?, wins=?, draws=?, losses=?, goals_for=?, goals_against=?, points=? 
      WHERE id=?");
    $stmt->bind_param(
      "issiiiiiiii",
      $data["position"],
      $data["logo"],
      $data["team_name"],
      $data["matches_played"],
      $data["wins"],
      $data["draws"],
      $data["losses"],
      $data["goals_for"],
      $data["goals_against"],
      $data["points"],
      $id
    );
    $stmt->execute();

    echo json_encode(["message" => "✅ Zaktualizowano dane drużyny."]);
    break;

  // =============================
  // 🔹 USUŃ DRUŻYNĘ (DELETE)
  // =============================
  case "DELETE":
    parse_str(file_get_contents("php://input"), $deleteData);
    $id = $_GET["id"] ?? $deleteData["id"] ?? null;

    if ($id) {
      $stmt = $conn->prepare("DELETE FROM league_table WHERE id = ?");
      $stmt->bind_param("i", $id);
      $stmt->execute();

      echo json_encode(["message" => "🗑️ Drużyna została usunięta z tabeli."]);
    } else {
      echo json_encode(["error" => "❌ Brak ID do usunięcia."]);
    }
    break;

  // =============================
  // 🔹 OPTIONS (dla CORS)
  // =============================
  case "OPTIONS":
    http_response_code(200);
    break;
}

$conn->close();
?>
