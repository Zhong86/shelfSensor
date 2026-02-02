<?php
require_once '/config/config.php'; 

function findBookInDb(book) {
  $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
  $stmt->bind_param("i", $book['key']);
  $stmt->execute(); 
  $result = $stmt->get_result(); 

  if($result->num_rows > 0) {
    return true;  
  } else {
    $insertStmt = $conn->prepare("INSERT INTO books (id, title, author, cover_id) VALUES (?,?,?,?)");
    $insertStmt->bind_param("ssss", $book['key'], $book['title'], $book['author_name'][0], $book['cover_i']);
    $insertStmt->execute(); 
  }

  //GET THE GENRE
  $genreApi = ''; 
}

?>
