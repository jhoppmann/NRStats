<?php
include_once 'config.inc.php';
/**
 * Tries to connect to the database for the givenparameters and returns the
 * connection object.
 *
 * @param unknown $dbHost
 *        	The database host
 * @param unknown $dbName
 *        	The database name
 * @param unknown $user
 *        	The user name
 * @param unknown $password
 *        	the user's password
 * @return mysqli
 */
function connectToDB() {
	global $dbHost, $dbName, $user, $password;
	// ob_start();
	$db = new mysqli($dbHost, $user, $password, $dbName);
	// ob_end_clean();
	return $db;
}

/**
 *
 * @return boolean
 */
function testConfig() {
	connectToDB($dbHost, $dbName, $user, $password);
	return !mysqli_connect_errno();
}
function connect() {
	global $dbHost, $dbName, $user, $password;
	return connectToDB($dbHost, $dbName, $user, $password);
}

/**
 * Saves a new line with the given values to the database.
 *
 * @param
 *        	$corp
 * @param
 *        	$runner
 * @param
 *        	$winner
 * @param
 *        	$winningType
 */
function saveLine($corp, $corpId, $corpPoints, $runner, $runnerId, $runnerPoints, $winner, $winningType) {
	$db = connectToDB();
	$queryString = "INSERT INTO game (ID, CORP, CORP_ID, CORP_POINTS, RUNNER, RUNNER_ID, RUNNER_POINTS, WINNER, WINNINGTYPE) VALUES ('', ";
	$queryString .= "'" . $corp . "', ";
	$queryString .= "'" . $corpId . "', ";
	$queryString .= "'" . $corpPoints . "', ";
	$queryString .= "'" . $runner . "', ";
	$queryString .= "'" . $runnerId . "', ";
	$queryString .= "'" . $runnerPoints . "', ";
	if ($winner == "Corp") {
		$queryString .= "'" . $corp . "', ";
	} else if ($winner == "Runner") {
		$queryString .= "'" . $runner . "', ";
	} else {
		$queryString .= "'" . $winner . "', ";
	}
	$queryString .= "'" . $winningType . "')";
	
	$db->query($queryString);
	$error = $db->error;
	$db->close();
	return $error;
}
function createGamesTable() {
	$columns = "";
	$columns .= "ID int(11) NOT NULL,";
	$columns .= "CORP varchar(25) NOT NULL,";
	$columns .= "CORP_ID varchar(50) NOT NULL,";
	$columns .= "CORP_POINTS TINYINT NOT NULL,";
	$columns .= "RUNNER varchar(25) NOT NULL,";
	$columns .= "RUNNER_ID varchar(50) NOT NULL,";
	$columns .= "RUNNER_POINTS TINYINT NOT NULL,";
	$columns .= "WINNER varchar(25) NOT NULL,";
	$columns .= "GAMEDATE timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,";
	$columns .= "WINNINGTYPE enum('POINTS','FLATLINE','DECK_EMPTY','') NOT NULL";
	
	createTable("game", $columns);
}
function createTable($tableName, $tableInfo) {
	// connect to server and get specified database
	$db = connectToDB();
	
	// check connection to server
	if (mysqli_connect_errno()) {
		printf("No connection to database server! (Error: %s )", mysqli_connect_errno());
		exit();
	}
	
	// table creation
	if ($db->query("CREATE TABLE IF NOT EXISTS " . $tableName . " (" . $tableInfo . ")"))
		echo "Table " . $tableName . " (" . $tableInfo . ") created.<br>";
	else {
		echo "Table couldn't be created.<br>";
		echo $db->error;
	}
	
	// close connection
	$db->close();
}
function createTestData() {
	$runner = "Jan";
	$corp = "Mike";
	
	$rand = rand(1, 2);
	if ($rand == 1) {
		$winner = 'Corp';
	} else {
		$winner = 'Runner';
	}
	
	$corpId = 'Builder of Nations';
	$corpPoints = rand(0, 7);
	
	$runnerId = 'Leela Patel';
	$runnerPoints = rand(0, 7);
	
	$rand = rand(1, 6);
	if ($rand < 4) {
		$winningType = 'POINTS';
	} else if ($rand < 6) {
		$winningType = 'FLATLINE';
	} else {
		$winningType = "DECK_EMPTY";
	}
	saveLine($corp, $corpId, $corpPoints, $runner, $runnerId, $runnerPoints, $winner, $winningType);
}
?>
