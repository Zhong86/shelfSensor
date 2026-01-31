<?php
require_once '../config/config.php'; 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); 
  exit(); 
}

//Get JSON form 
$input = json_decode(file_get_contents('php://input'), true); 

if (!$input || !isset($input['username']) || !isset($input['password'])) {
  echo json_encode([
    'success' => false, 
    'message' => 'Username and password are required'
  ]); 

  exit(); 
}

$username = $conn->real_escape_string($input['username']); 
$password = $input['password']; 

$q = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
$result = $conn->query($q); 

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc(); 

  if (password_verify($password, $user['password'])) {
    echo json_encode([
      'success' => true, 
      'message' => 'Login successful', 
      'user' => [
        'id' => $user['id'], 
        'username' => $user['username']
      ]
    ]); 
  } else {
    echo json_encode([
      'success' => false, 
      'message' => 'Invalid password'
    ]); 
  }
} else {
  echo json_encode([
    'success' => false, 
    'message' => 'User not found'
  ]); 
}

$conn->close(); 
?>
