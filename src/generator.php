<?php

date_default_timezone_set('America/New_York');

header('Content-type: application/json');

//arbitrary start time change to whatever you'd like
$begin_epoch = strtotime("7 July 2002");

$epoch = time();

$genID = getSeqID_MongoDB();

$seq_id = $genID % 1024;

$id = ($epoch - $begin_epoch) << 23;

$id = $id | $seq_id;

$returnArray = Array();

$returnArray["id"] = $id;

$jsonStr = json_encode($returnArray);

$callBack = "";

if(isset($_REQUEST['callback']))
	$callBack = $_REQUEST['callback'];

if($callBack == "")
{
	echo $jsonStr;
} else {
	echo $callBack . "(". $jsonStr .")";
}

function getSeqID_MongoDB()
{
	$con = new Mongo("mongodb://127.0.0.1"); // Connect to Mongo Server
	$db = $con->selectDB("cookie_tracker"); // Connect to Database
	$coll = $db->selectCollection("trk_tracker"); //Select the collection
	
	$autoReturn = $coll->findOne(array("sitetracker" => "autoid"));
	
	if(is_null($autoReturn))
	{
	
		$autoid = array("sitetracker"=>"autoid", "seq" => 1);

		$coll->insert($autoid);
		
	}
	
	$coll->update(array("sitetracker" => "autoid"), array('$inc' => array('seq' => 1)));
	
	$con->close();
	
	return $autoReturn["seq"];
	
} //end getSeqIDMongo

function getSeqID_MySQL()
{
	
	$id = 0;
	
	$link = mysql_connect("127.0.0.1", "root", "");
	
	mysql_select_db("cookie_gen", $link);
	
	$sql = "insert into cookie_gen.cookie_id_seq (id) values (0)";
	
	mysql_query($sql, $link);
	
	$sql = "SELECT LAST_INSERT_ID() as lii";
	
	$result = mysql_query($sql, $link);
	
	$row = mysql_fetch_assoc($result);
	
	$id = $row['lii'];
	
	mysql_close($link);
	
	return $id;
} //end getSeqID