/**
 * Draws a pie chart into a card
 * 
 * @param columns
 *            The columns used
 * @param rowArray
 *            The array containing the data rows
 * @param div
 *            The div in which to draw
 */
function drawPieChart(columns, rowArray, div) {
	var pieChart = chartSetup(columns, rowArray);
	var options = {
		'width' : 500,
		'height' : 300
	};

	var chart = new google.visualization.PieChart(document.getElementById(div));
	chart.draw(pieChart, options);
}

/**
 * Common setup method for charts. Builds a new Chart, then sets the column data
 * and the rows to display.
 * 
 * @param columns
 *            Columns to add to the chart
 * @param rowArray
 *            An array of row data
 * @returns A new chart with rows and columns
 */
function chartSetup(columns, rowArray) {
	var chart = new google.visualization.DataTable();
	columns.forEach(function(line) {
		chart.addColumn(line.type, line.name);
	})
	var rows = associativeArraysToRows(rowArray);
	chart.addRows(rows);
	return chart;
}

/**
 * Draws a bar chart for the given values.
 * 
 * @param columns
 *            The columns in the Chart
 * @param rowArray
 *            The rows of the cart
 * @param div
 *            The div where to display the chart
 * @param horizontal
 *            If <tt>true</tt>, the bars are displayed horizontally
 */
function drawBarChart(columns, rowArray, div, horizontal) {
	var barChart = chartSetup(columns, rowArray);
	var options = {
		width : 500,
		height : 300,
		hAxis : {
			viewWindow : {
				min : 0
			}
		}
	};

	var view = new google.visualization.DataView(barChart);
	view.setColumns([ 0, 1, {
		calc : "stringify",
		sourceColumn : 1,
		type : "string",
		role : "annotation"
	} ]);

	if (horizontal) {
		var chart = new google.visualization.BarChart(document
				.getElementById(div));
	} else {
		var chart = new google.visualization.ColumnChart(document
				.getElementById(div));
	}
	chart.draw(view, options);
}

/**
 * Extracts keys from an associative array.
 * 
 * @param theArray
 *            The array of which to extract the keys
 * @returns An array containing all keys of in the array
 */
function getKeysInArray(theArray) {
	var keys = [];
	for ( var key in theArray) {
		if (theArray.hasOwnProperty(key))
			keys.push(key);
	}
	return keys;
}

/**
 * Takes an associative array and transforms its content to an array of rows
 * useable by the Google Charts API. Rows are simple objects, containing the key
 * (name of the row) and its value.
 * 
 * @param theArray
 *            The source array
 * @returns An array of rows
 */
function associativeArraysToRows(theArray) {
	var keys = getKeysInArray(theArray);
	rows = [];
	for (i = 0; i < keys.length; i++) {
		var row = [ keys[i], theArray[keys[i]] ];
		rows.push(row);
	}
	return rows;
}