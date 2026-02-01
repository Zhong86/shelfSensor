<?php
session_start(); 
header('Content-Type: application/json'); 

echo json_encode([ 
  'loggedIn'=> isset($_SESSION['user_id']), 
  'user' => isset($_SESSION['user_id']) ? [
    'id' => $_SESSION['user_id'], 
    'username' => $_SESSION['username']
  ] : null
]); 
?>
