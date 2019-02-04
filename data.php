<?php

define('fromData',true);
/
if(empty(/* check if the get superglobal variable 'action' is empty*/)){
	exit('no action specified');
}
//require the mysql_connect.php file.  Make sure your properly configured it!


$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

switch(/*do a comparison switch on the get superglobal action*/){
	case 'readAll':
		//include the php file 'read.php'
		break;
	case 'insert':
		//include the php file insert.php
		break;
	case 'delete':
		//include the php file delete.php
		break;
	case 'update':
		//include the update.php file
		break;
}

//convert the $output variable to json, store the result in $outputJSON

//print $outputJSON

//end

?>