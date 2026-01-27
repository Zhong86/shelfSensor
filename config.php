<?php
$server = 'localhost'; 
$user = 'root'; 
$password = ''; 
$db = 'books';
$conn = ''; 

try {
  $conn = new mysqli($server, $user, $password, $db); 
  echo("Connected to SQL<br>");  
} catch (mysqli_sql_exception) {
  echo "Failed to connect to SQL <br>"; 
}

?>
