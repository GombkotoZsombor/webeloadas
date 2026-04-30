<?php
// api.php
header('Content-Type: application/json; charset=utf-8');
// Ha a React fejlesztői szervere (pl. localhost:5173) máshonnan fut, ez kelleni fog:
header('Access-Control-Allow-Origin: *'); 

// Csatlakozási adatok (lokális XAMPP esetén ezek az alapértelmezettek)
$host = 'localhost';
$dbname = 'tánc'; 
$user = 'root'; 
$pass = ''; 

try {
    // A kiírásban szereplő PDO kapcsolódási mód
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );

    // Teszt lekérdezés (Read művelet): Kérjük le az első 10 tagot
    $stmt = $dbh->query("SELECT * FROM tag LIMIT 10");
    $tagok = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Az eredmény visszaküldése JSON formátumban a frontendnek
    echo json_encode($tagok);

} catch (PDOException $e) {
    // Hiba esetén is JSON-t adunk vissza, hogy a JS tudja kezelni
    echo json_encode(['error' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
?>