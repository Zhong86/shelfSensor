<?php
require_once '../config.php';

$q = 'SELECT * FROM users'; 
$result = $conn->query($q); 

$data = []; 

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data = $row
  }
}

header("Content-type: application/json");
echo json_encode($data); 

$conn->close(); 
?>
