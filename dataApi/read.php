<?php

require_once('mysql_connect.php');

$query = "SELECT * FROM `checkbook`";
$result = null;

$result = mysqli_query($conn, $query);
if(empty($result)) {
	$output['error'][] = mysqli_error($conn);
} else {
	if(mysqli_num_rows($result)>0) {
		$output['success'] = true;
		$output['data']=[];
		while($row=mysqli_fetch_assoc($result)) {
			$output['data'][] = $row;
		}
		
	} else {
		$output['error'][] = 'no data available';
	}
}


?>