<?php
require_once "db_connection.php";
// Fetch all visitors from the database
$sql = "SELECT * FROM visitors";
$result = mysqli_query($conn, $sql);

// Check if there are any records
if (mysqli_num_rows($result) > 0) {
    // Initialize an array to store the visitor data
    $visitors = array();

    // Loop through the records and add them to the array
    while ($row = mysqli_fetch_assoc($result)) {
        $visitors[] = $row;
    }

    // Return the visitor data as JSON
    header('Content-Type: application/json');
    echo json_encode($visitors);
} else {
    // Return an empty array if no visitors found
    echo json_encode([]);
}
?>
