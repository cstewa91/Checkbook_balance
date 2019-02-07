<?php
require_once('mysql_connect.php');
if(empty($_GET['type']) || empty($_GET['item']) || empty($_GET['amount']) || empty($_GET['date']) || empty($_GET['account'])) {
	$output['errors'][] = 'No enough data';
}

$type = $_GET['type'];
$name = $_GET['item'];
$amount = $_GET['amount'];
$date = $_GET['date'];
$account = $_GET['account'];
$query = "INSERT INTO `checkbook`(`type`, `name`, `amount`, `date`, `account`) VALUES ('$type','$name','$amount', '$date', '$account')";
$result = null;
$result = mysqli_query($conn, $query);
if(empty($result)) {
	$output['error'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn)>0) {
		$output['success'] = true;
		$itemID = mysqli_insert_id($conn);
		$output['itemID'] = $itemID;
	} else {
			$output['errors'][] = 'no data';
	}
}

?>