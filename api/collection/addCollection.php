<?php
require_once '/api/middleware/corsCollections.php'; 
require_once '/config/config.php'; 

$input = json_decode(file_get_contents('php://input'), true); 

if (!$input && !isset($input['book']) ) {
  echo json_encode([
    'success' => false, 
    'mesage' => 'A book to add is required'
  ]); 
  exit(); 
}

$user_id = $_SESSION['user_id']; 
$book = $input['book']; 

$stmt = $conn->prepare("SELECT * FROM user_books WHERE user_id = ? AND work_key = ?"); 
$stmt->bind_param("is", $user_id, $book['key']); 
$stmt->execute(); 
$result = $stmt->get_result(); 
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc(); 
  echo json_encode([
    'success' => false, 
    'message' => 'Book already saved'
  ]); 
  exit(); 
}

//WORK ON GENRE IMPLEMENTATION
$title = $book['title'];
$author = $book['author_name'][0];
$cover_id = $book['cover_i']; 
$genre = ''; 
$status = $input['status']; 
$notes = isset($input['notes']) ? $input['notes'] : ''; 

$stmt = $conn->prepare("INSERT INTO user_books (user_id, work_key, title, author, cover_id, genre, status, notes) VALUES (?,?,?,?,?,?,?,?)"); 
$stmt = bind_param("isssisss");

?>
