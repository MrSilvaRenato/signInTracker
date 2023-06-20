<?php
// Database configuration
require_once "db_connection.php";

$phone = $_POST['phone'];
$leaveTime = $_POST['leavedateTime'];

// SQL query to check if the phone number matches and update the sign-out time
$sql = "SELECT * FROM visitors WHERE phone = '$phone' AND sign_out_time IS NULL";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Phone number matches, update the sign-out time
    $updateSql = "UPDATE visitors SET sign_out_time = '$leaveTime' WHERE phone = '$phone' AND sign_out_time IS NULL";
    if ($conn->query($updateSql) === TRUE) {
       $response = "Visitor signed out successfully.";
    } else {
      $response = "wrong number, please type the number you used to sign in.";
    }
}
echo $response;
$conn->close();
?>
