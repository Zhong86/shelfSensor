<?php
//DELETE WHEN LAUNCh
ini_set('display_errors', 1); 
error_reporting(E_ALL); 

session_start(); 
require_once __DIR__ . '/../../config/config.php'; 

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

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? LIMIT 1");
$stmt->bind_param('s', $username); 
$stmt->execute();
$checkResult = $stmt->get_result(); 

if ($checkResult->num_rows > 0) {
  echo json_encode([
    'success' => false, 
    'message' => 'Username already exist'
  ]); 
  exit(); 
}

$hashedPass = password_hash($password, PASSWORD_DEFAULT); 

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPass); 
$stmt->execute(); 

if ($stmt->get_result() === TRUE) {
  $_SESSION['user_id'] = $conn->insert_id; 
  $_SESSION['username'] = $username; 

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
