<?php
session_start(); 

if (!isset($_SESSION['user_id']) && isset($_COOKIE['remember_token'])) {
  require_once __DIR__ . '/../../config/config.php';

  $token = $_COOKIE['remember_token']; 
  $hashedToken = hash('sha256', $token); 

  $stmt = $conn->prepare("SELECT user_id FROM remember_tokens WHERE token = ? AND expires_at > NOW()"); 
  $stmt->bind_param("s", $hashedToken); 
  $stmt->execute(); 
  $result = $stmt->get_result(); 

  if ($row = $result->fetch_assoc()) {
    $userStmt = $conn->prepare("SELECT * FROM users WHERE id = ?"); 
    $userStmt->bind_param("i", $row['user_id']); 
    $userStmt->execute(); 
    $user = $userStmt->get_result()->fetch_assoc(); 
  }

  $_SESSION['user_id'] = $user['id']; 
  $_SESSION['username'] = $user['username']; 
}
?>
