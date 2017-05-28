<?php
include_once 'scripts/databaseFunctions.inc.php';

$db = connectToDB();
$rows = array ();
if ($table = $db->query("SELECT * FROM game")) {
	while ( $data = $table->fetch_object() ) {
		$rows [] = $data;
	}
	$table->close();
}
$db->close();

$json = json_encode($rows);

if (isset($_GET ["callback"])) {
	echo $_GET ["callback"] . "(" . $json . ");";
} else {
	echo $json;
}
?>