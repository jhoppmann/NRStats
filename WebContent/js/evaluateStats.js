$(window).on('load', function(e) {
	setup();
});

var data;

/**
 * Performs page setup functions
 */
function setup() {
	$('.nondismiss').modal({
		dismissible : false
	});
	$('.dismiss').modal();
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", "./get.php?callback=fetched");
	$("head").append(newScriptElement);
}

/**
 * Uses the data fettched from the server and loads tables
 * 
 * @param dataFromServer
 *            Data load from database
 */
function fetched(dataFromServer) {
	console.log("Fetched " + dataFromServer.length + " games from database.");
	data = dataFromServer;

	setStats();
	setTable();

	google.charts.load('current', {
		'packages' : [ 'corechart' ]
	});
	google.charts.setOnLoadCallback(collectData);
}

/**
 * Puts data into the general statistics table
 */
function setStats() {
	document.getElementById("games").innerHTML = data.length + " Games played";
}

/**
 * Builds game table and sets it into the drawer modal on the bottom of the page
 */
function setTable() {
	data.forEach(function(line) {
		var newTableRow = "<tr>";
		newTableRow += "<td>" + line.CORP + "</td>";
		newTableRow += "<td>" + line.CORP_ID + "</td>";
		newTableRow += "<td>" + line.CORP_POINTS + "</td>";
		newTableRow += "<td>" + line.RUNNER + "</td>";
		newTableRow += "<td>" + line.RUNNER_ID + "</td>";
		newTableRow += "<td>" + line.RUNNER_POINTS + "</td>";
		newTableRow += "<td>" + line.WINNER + "</td>";
		newTableRow += "<td>" + line.GAMEDATE + "</td>";
		newTableRow += "<td>" + line.WINNINGTYPE + "</td>";
		newTableRow += "</tr>";

		$('#gamesTable').append(newTableRow);
	})
	document.getElementById("gamesTable").addEventListener("scroll",
			function() {
				var translate = "translate(0," + this.scrollTop + "px)";
				this.querySelector("thead").style.transform = translate;
			});
}

/**
 * Counts winning types of games
 * 
 * @param data
 *            Data fetched from server
 * @returns Associative array with winning type and number
 */
function countGameTypes(data) {
	var array = [];

	data.forEach(function(line) {
		array[line.WINNINGTYPE] = array[line.WINNINGTYPE] + 1 || 1;
	});
	return array;
}

/**
 * Counts how often a player has won a game.
 * 
 * @param data
 *            Data fetched from Server
 * @returns Associative array with winner and number
 */
function countWonGames(data) {
	var array = [];

	data.forEach(function(line) {
		array[line.WINNER] = array[line.WINNER] + 1 || 1;
	});
	return array;
}

/**
 * Accumulated points for both factions
 * 
 * @param data
 *            The data fetched from the server
 * @returns An associative array with points for runner and corp
 */
function countGamePointsByFaction(data) {
	var array = [];
	array["Runner"] = 0;
	array["Corp"] = 0;
	data.forEach(function(line) {
		array["Runner"] = array["Runner"] + Number(line.RUNNER_POINTS);
		array["Corp"] = array["Corp"] + Number(line.CORP_POINTS);
	});
	return array;
}

/**
 * Counts games played and win ratio by id
 * 
 * @param data
 *            Data fetched from the Server
 * @returns An array containing number of games played and ratios
 */
function countGamesWonById(data) {
	var array = [];
	data.forEach(function(line) {
		if (!array.hasOwnProperty(line.CORP_ID)) {
			array[line.CORP_ID] = {
				gamesPlayed : 1,
				gamesWon : 0
			}
		} else {
			array[line.CORP_ID].gamesPlayed++;
		}
		if (!array.hasOwnProperty(line.RUNNER_ID)) {
			array[line.RUNNER_ID] = {
				gamesPlayed : 1,
				gamesWon : 0
			}
		} else {
			array[line.RUNNER_ID].gamesPlayed++;
		}

		if (line.WINNER == line.CORP) {
			array[line.CORP_ID].gamesWon++;
		} else {
			array[line.RUNNER_ID].gamesWon++;
		}

	});
	return array;
}

/**
 * Collects data and draws the charts
 * 
 * @returns
 */
function collectData() {
	// Games won by type
	var gameTypes = countGameTypes(data);
	var columns = [];
	columns.push({
		type : "string",
		name : "Game Type"
	});
	columns.push({
		type : "number",
		name : "Games"
	});
	drawPieChart(columns, gameTypes, "gameTypes");

	// Game winners by person
	var winners = countWonGames(data);
	columns = [];
	columns.push({
		type : "string",
		name : "Player"
	});
	columns.push({
		type : "number",
		name : "Won Games"
	});
	drawPieChart(columns, winners, "wonGames");

	var accumulativePoints = countGamePointsByFaction(data);
	columns = [];
	columns.push({
		type : "string",
		name : "Faction"
	});
	columns.push({
		type : "number",
		name : "Overall Points"
	});
	drawBarChart(columns, accumulativePoints, "accumulatedPoints", true);

	var wonGamesById = countGamesWonById(data);
	var ratios = [];
	var keys = getKeysInArray(wonGamesById);
	var idsPlayed = [];
	for (i = 0; i < keys.length; i++) {
		wonGamesById[keys[i]].ratio = (wonGamesById[keys[i]].gamesWon / wonGamesById[keys[i]].gamesPlayed) * 100;
		if (wonGamesById[keys[i]].ratio > 0) {
			ratios[keys[i]] = wonGamesById[keys[i]].ratio;
		}
		idsPlayed[keys[i]] = wonGamesById[keys[i]].gamesPlayed;
	}

	columns = [];
	columns.push({
		type : "string",
		name : "ID"
	});
	columns.push({
		type : "number",
		name : "Games played"
	});
	drawPieChart(columns, idsPlayed, "idsPlayed");

	columns = [];
	columns.push({
		type : "string",
		name : "ID"
	});
	columns.push({
		type : "number",
		name : "Percentage won"
	});
	drawBarChart(columns, ratios, "wonById");
}
