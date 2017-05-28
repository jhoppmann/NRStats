<?php
include_once 'scripts/databaseFunctions.inc.php';

$invocation = file_get_contents('php://input');
$json_rpc = json_decode($invocation);

if (isset($json_rpc) && $json_rpc->{"method"} == "SET.SAVE") {
	
	$values = $json_rpc->{"params"};
	$winner = $values->{'WINNER'};
	$corp = $values->{'CORP'};
	$corpId = $values->{'CORP_ID'};
	$corpPoints = $values->{'CORP_POINTS'};
	$runner = $values->{'RUNNER'};
	$runnerId = $values->{'RUNNER_ID'};
	$runnerPoints = $values->{'RUNNER_POINTS'};
	$winningType = $values->{'WINNINGTYPE'};
	
	$callback = $values->{'callback'};
	
	$return = saveLine($corp, $corpId, $corpPoints, $runner, $runnerId, $runnerPoints, $winner, $winningType);
	if (isset($callback)) {
		$json = "";
		if (empty($return)) {
			$json = $json . "{'status': 'success'}";
		} else {
			$json = $json . "{'status': 'error', 'message': '" . $return . "'}";
		}
		
		echo $callback . "(" . $json . ");";
	}
}
?>