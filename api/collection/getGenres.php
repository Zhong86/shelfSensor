<?php
require_once __DIR__ . '/../../config/config.php';

header('Content-Type: application/json');

$stmt = $conn->prepare('SELECT id, name FROM genres ORDER BY name ASC');
$stmt->execute(); 
$result = $stmt->get_result(); 

$genres = []; 
while ($row = $result->fetch_assoc()) {
  $genres[] = $row; 
}

$stmt->close(); 
$conn->close(); 

echo json_encode([
  'success' => true, 
  'genres' => $genres
]); 
?>
