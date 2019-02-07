<?php
require_once('mysql_connect.php');
if(empty($_GET['type']) || empty($_GET['item']) || empty($_GET['amount']) || empty($_GET['date']) || empty($_GET['account'])) {
	$output['errors'][] = 'No enough data';
}

$deleteID = $_GET['id'];
$query = "DELETE FROM `checkbook` WHERE `id`= $deleteID ";
$result = null;

$result = mysqli_query($conn, $query);

if(empty($result)) {
	$output['errors'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn) == 1) {
		$output['success'] = true;
	} else {
		$output['error'][] = 'delete error';
	}
}

?>