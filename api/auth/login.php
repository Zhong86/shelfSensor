<?php
//DELETE WHEN LAUNCh
ini_set('display_errors', 1); 
error_reporting(E_ALL); 

session_start(); 
require_once __DIR__ . '/../../config/config.php';
require_once '../middleware/corsCollections.php';

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

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
$stmt->bind_param("s", $username); 
$stmt->execute(); 
$result = $stmt->get_result(); 

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc(); 

  if (password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id']; 
    $_SESSION['username'] = $user['username'];

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
    exit(); 
  }
} else {
  echo json_encode([
    'success' => false, 
    'message' => 'User not found'
  ]); 
  exit(); 
}

if (isset($input['remember']) && $input['remember'] === true) {
  //secure token
  $token = bin2hex(random_bytes(32)); 
  $userId = $user['id'];

  $expireDate = date('Y-m-d H:i:s', strtotime('+30 days')); 
  $hashedToken = hash('sha256', $token); 
  $stmt = $conn->prepare("INSERT INTO remember_token (user_id, token, expires_at) VALUES (?, ?, ?)");
  $stmt->bind_param("iss", $userId, $token, $expireDate); 
  $stmt->execute(); 

  setcookie('remember_token', $token, time() + (30 * 24 * 60 * 60), '/', '', true, true); 
}

$conn->close(); 
?>
