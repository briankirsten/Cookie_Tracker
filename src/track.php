<?php

date_default_timezone_set('America/New_York');

header('Content-type: application/json');

$trk_name = "";

$cookieVal = "";

$database = "";

$table = "";

$checkVal = Array();

$paramArray = Array();

foreach($_REQUEST as $key => $value)
{
	if($key == "trk_name")
	{
		$trk_name = $value;
	} else if(($trk_name != "") && ($key == $trk_name))
	{
		$cookieVal = $value;
	} else if($key == "database")
	{
		$database = $value;
	} else if($key == "table")
	{
		$table = $value;
	} else if($key == "checkVal"){
		
		$checkArray = explode("|", $value);
		
		$theKey = $checkArray[0];
		
		$theValue = $checkArray[1];
		
		$checkVal["key"] = $theKey;
		
		$checkVal["value"] = $theValue;
		
	} else {
		
		$paramArray[$key] = $value;
	}
	
}

$con = new Mongo("mongodb://127.0.0.1"); // Connect to Mongo Server
$db = $con->selectDB($database); // Connect to Database
$coll = $db->selectCollection($table); //Select the collection

$autoReturn = $coll->findOne(array($trk_name => $cookieVal, $checkVal["key"] => $checkVal["value"]));

if(is_null($autoReturn)){

	$trackObj = array($trk_name=>$cookieVal);

	foreach($paramArray as $key => $value)
	{
		$trackObj[$key] = $value;
	}

	$trackObj["ts"] = new MongoDate();

	$coll->insert($trackObj);
	
}
	
$con->close();


echo "{\"status\":\"success\"}";