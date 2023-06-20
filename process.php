<?php
// Database configuration
require_once "db_connection.php";

// Retrieve form data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$phone = $_POST['phone'];
$company = $_POST['company'];
$emergencyContact = $_POST['emergencyContact'];
$sites = implode(", ", $_POST['site']);
$reason = $_POST['reason'];
$visitDateTime = $_POST['visitDateTime']; // Selected date and time

// SQL query to insert visitor data into the database
$sql = "INSERT INTO visitors (first_name, last_name, phone, company, emergency_contact, site, reason, date_visited)
        VALUES ('$firstName', '$lastName', '$phone', '$company', '$emergencyContact', '$sites', '$reason', '$visitDateTime')";

if ($conn->query($sql) === TRUE) {
    $response = "Thank you, you have signed in.";
} else {
    $response = "Error: " . $sql . "<br>" . $conn->error;
}

echo $response;


$conn->close();
?>