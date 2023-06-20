<?php
$servername = "sql207.epizy.com";
$username = "epiz_34339271";
$password = "7dy7xhCn2CXk47C";
$dbname = "epiz_34339271_hdsvisitors";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>