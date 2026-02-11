<?php
$allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3000/index.php', 
  'http://localhost:3000/pages/collectionsPage.php',
  'http://localhost:3000/pages/loginPage.php'
]; 

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin"); 
} else {
  http_response_code(403); 
  echo json_encode([
    'error' => 'Not recognized origin'
  ]); 
  exit(); 
}

header('Content-Type: application/json'); 
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT'); 
header('Access-Control-Allow-Headers: Content-Type'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); 
  exit(); 
}

?>
