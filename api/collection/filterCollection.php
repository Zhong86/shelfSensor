<?php
session_start(); 
require_once __DIR__ . '/../../config/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode([
    'success' => false, 
    'message' => 'User not authorized'
  ]); 
  exit(); 
}

$user_id = $_SESSION['user_id'];
$genre_id = isset($_GET['genre_id']) ? intval($_GET['genre_id']) : null; 
$status = isset($_GET['status']) ? $_GET['status'] : null; 

if ($genre_id) {
  $q = "
    SELECT DISTINCT b.*, ub.status, ub.notes, ub.created_at as added_at
    FROM user_books ub
    JOIN books b ON ub.book_id = b.id
    JOIN book_genres bg ON b.id = bg.book_id
    WHERE ub.user_id = ?
    AND bg.genre_id = ?
  ";
  
  if($status) $q .= ' AND ub.status = ? '; 
  $q .= ' ORDER BY ub.created_at DESC'; 
  
  $stmt = $conn->prepare($q);
  if ($status) {
    $stmt->bind_param("iis", $user_id, $genre_id, $status);
  } else {
    $stmt->bind_param("ii", $user_id, $genre_id);
  }
} else {
  $query = "
    SELECT b.*, ub.status, ub.notes, ub.created_at as added_at
    FROM user_books ub
    JOIN bookbs b ON ub.book_id = b.id
    WHERE ub.user_id = ?
  "; 

  if($status) $q .= ' AND ub.status = ? '; 
  $q .= ' ORDER BY ub.created_at DESC'; 
  $stmt = $conn->prepare($q);
  if ($status) {
    $stmt->bind_param("iis", $user_id, $genre_id, $status);
  } else {
    $stmt->bind_param("ii", $user_id, $genre_id);
  }
}

$stmt->execute(); 
$result = $stmt->get_result(); 

$books = []; 
while ($row = $result->fetch_assoc()) {
  $genreStmt = $conn->prepare("
    SELECT g.id, g.name
    FROM book_genres bg
    JOIN genres g ON bg.genre_id = g.id
    WHERE bg.book_id = ?
  ");
  $genreStmt->bind_param('s', $row['id']);
  $genreStmt->execute(); 
  $genreResult = $genreStmt->get_result(); 
  
  $genres = []; 
  while ($genreRow = $genreResult->fetch_assoc()) {
    $genres[] = $genreRow; 
  }
  $genreStmt->close(); 
  $row['genres'] = $genres; 
  $books[] = $row; 
}

$stmt->close(); 
$conn->close(); 

echo json_encode([
  'success' => true, 
  'books' => $books
]); 
?>
