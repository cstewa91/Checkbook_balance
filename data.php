<?php

define('fromData',true);

if(empty($_GET['action'])){
	exit('no action specified');
}
require_once('mysql_connect.php');


$output = [
	'success'=> false, 
	'errors'=>[]
];

switch($_GET['action']){
	case 'readAll':
		include 'dataApi/read.php';
		break;
	case 'insert':
		include 'dataApi/insert.php';
		break;
	case 'delete':
		include 'dataApi/delete.php';
		break;
	case 'update':
		include 'dataApi/update.php';
		break;
}


$outputJson = json_encode($output);


echo $outputJson



?>