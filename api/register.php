<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once '../config/config.php'; 

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST'); 
header('Access-Control-Allow-Headers: Content-Type'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); 
  exit(); 
}

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

$checkQ = "SELECT id FROM users WHERE username = '$username' LIMIT 1";
$checkResult = $conn->query($checkQ); 

if ($checkResult->num_rows > 0) {
  echo json_encode([
    'success' => false, 
    'message' => 'Username already exist'
  ]); 
  exit(); 
}

$hashedPass = password_hash($password, PASSWORD_DEFAULT); 

$insertQ = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPass')";

if ($conn->query($insertQ) === TRUE) {
  echo json_encode([
    'success' => true, 
    'message' => 'User registered successfully', 
    'user_id' => $conn->insert_id
  ]); 
} else {
  echo json_encode([
    'success' => false, 
    'message' => 'Registration failed: ' . $conn->error
  ]); 
}

$conn->close();
?>
