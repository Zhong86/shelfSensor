<?php
function findBookInDb($conn, $book) {
  if (!isset($book['key'])) {
    echo json_encode([
      'success' => false, 
      'message' => 'CheckBook error: book key missing'
    ]); 
    exit(); 
  }

  $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
  $stmt->bind_param("s", $book['key']);
  $stmt->execute(); 
  $result = $stmt->get_result(); 

  if($result->num_rows > 0) {
    $stmt->close(); 
    return true;  
  } 
  
  $insertStmt = $conn->prepare("INSERT INTO books (id, title, author, cover_id) VALUES (?,?,?,?)");
  $insertStmt->bind_param("ssss", $book['key'], $book['title'], $book['author_name'][0], $book['cover_i']);

  if(!$insertStmt->execute()) {
    $insertStmt->close(); 
    echo json_encode([
      'success' => false, 
      'message' => 'Failed to insert book to db'
    ]); 
    exit(); 
  }
  $insertStmt->close(); 

  //GET THE GENRE
  $genres = getGenres($book);
  if (!empty($genres)) {
    insertBookGenres($conn, $book['key'], $genres); 
  }

  return true; 
}

function getGenres($book) {
  $genres = []; 
  
  if (isset($book['subject'])) {
    return array_slice($book['subject'], 0, 5); 
  }

  if (isset($book['key'])) {
    $workKey = $book['key'];

    $apiUrl = 'https://openlibrary.org' . $workKey . '.json'; 
    
    $context = stream_context_create([
      'http' => ['timeout' => 5, 'user_agent' => 'ShelfSensor/1.0']
    ]); 
    $response = @file_get_contents($apiUrl, false, $context); 
    echo $response;
    
    if ($response !== false) {
      $data = json_decode($response, true); 
      
      if (isset($data['subjects']) && is_array($data['subjects'])) {
        $genres = array_slice($book['subject'], 0, 10); 
      }
    }
  }

  return $genres;
}

//deal with genres, ENUM?
function insertBookGenres($conn, $bookId, $apiGenres) {
  $stmt = $conn->prepare("SELECT id, name FROM genres");
  $stmt->execute(); 
  $result = $stmt->get_result(); 

  $predefinedGenres = []; 
  while ($row = $result->fetch_assoc()) {
    $predefinedGenres[] = $row; 
  }
  $stmt->close(); 
  
  $matchedGenreIds = []; 
  foreach ($apiGenres as $apiGenre ) {
    $apiGenreLower = strtolower(trim($apiGenre));
    foreach ($predefinedGenres as $predefinedGenre) {
      $genreName = strtolower($predefinedGenre['name']);
      
      if ($apiGenreLower === $genreName) {
        $matchedGenreIds[] = $predefinedGenre['id'];
      }
    }
  }
  
  $matchedGenreIds = array_unique($matchedGenreIds);
  
  if (!empty($matchedGenreIds)) {
    $stmt = $conn->prepare('INSERT IGNORE INTO book_genres (book_id, genre_id) VALUES (?, ?)');
    foreach ($matchedGenreIds as $genreId) {
      $stmt->bind_param('si', $bookId, $genreId);
      $stmt->execute(); 
    }

    $stmt->close(); 
  }
}

function getGenresByBook($conn, $bookId) {
  $stmt = $conn->prepare("
    SELECT g.name FROM book_genres bg 
    JOIN genres g ON bg.genre_id = g.id
    WHERE bg.book_id = ?
  "); 
  $stmt->bind_param("s", $bookId); 
  $stmt->execute(); 
  $result = $stmt->get_result(); 
  
  $genres = []; 
  while ($row = $result->fetch_assoc()) {
    $genres[] = $row['name']; 
  }
  $stmt->close(); 
  return $genres; 
}

?>
