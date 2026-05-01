<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'localhost';
$dbname = 'tánc';
$user = 'root'; 
$pass = ''; 

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );

    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($method) {
        case 'GET': // Olvasás (Read)
            $stmt = $dbh->query("SELECT * FROM tag ORDER BY id DESC LIMIT 50");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST': // Létrehozás (Create)
            $sql = "INSERT INTO tag (id, nev, ferfi, szulido) VALUES (:id, :nev, :ferfi, :szulido)";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                ':id' => $input['id'],
                ':nev' => $input['nev'],
                ':ferfi' => $input['ferfi'],
                ':szulido' => $input['szulido']
            ]);
            echo json_encode(['message' => 'Sikeres hozzáadás']);
            break;

        case 'PUT': // Frissítés (Update)
            $sql = "UPDATE tag SET nev = :nev, ferfi = :ferfi, szulido = :szulido WHERE id = :id";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                ':id' => $input['id'],
                ':nev' => $input['nev'],
                ':ferfi' => $input['ferfi'],
                ':szulido' => $input['szulido']
            ]);
            echo json_encode(['message' => 'Sikeres frissítés']);
            break;

        case 'DELETE': // Törlés (Delete)
            $sql = "DELETE FROM tag WHERE id = :id";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([':id' => $input['id']]);
            echo json_encode(['message' => 'Sikeres törlés']);
            break;

        default:
            echo json_encode(['error' => 'Érvénytelen kérés']);
            break;
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
?>
