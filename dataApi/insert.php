<?php
require_once('../mysql_connect.php');
if(empty($_GET['name']) || empty($_GET['grade']) || empty($_GET['course_name'])) {
	$output['errors'][] = 'No enough data';
}
print_r($_GET);

$name = $_GET['name'];
$grade = $_GET['grade'];
$courseName = $_GET['course_name'];
$query = "INSERT INTO `student_data`(`name`, `grade`, `course_name`) VALUES ('$name','$grade','$courseName')";
$result = null;
$result = mysqli_query($conn, $query);
print_r($result);
if(empty($result)) {
	$output['error'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn)>0) {
		$output['success'] = true;
		$insertID = mysqli_insert_id($conn);
		$output['insertID'] = $insertID;
		print('insert success');
	} else {
			$output['errors'][] = 'no data';
	}
}
?>