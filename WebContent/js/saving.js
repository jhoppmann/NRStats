/**
 * Reads the form data and sends it to the server
 */
function readAndSave() {
	closeForm();

	var namedArray = $('#gameForm').serializeArray();
	var params = {};
	for (var i = 0; i < namedArray.length; i++) {
		params[namedArray[i].name] = namedArray[i].value;
	}
	params.callback = "saved";

	var jsonData = {};
	jsonData.jsonrpc = "2.0";
	jsonData.method = "SET.SAVE";
	jsonData.params = params;
	jsonData.id = "saving";
	var jsonToSend = JSON.stringify(jsonData);
	console.log(jsonToSend);

	var url = "set.php";
	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.send(jsonToSend);
	eval(request.responseText);

	resetForm($('#gameForm'));
}

/**
 * Clears a form
 * 
 * @param $form
 *            The form element to clear
 */
function resetForm($form) {
	$form
			.find(
					'input:text, input:password, :input[type=number], input:file, select, textarea')
			.val('');
	$form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr(
			'selected');
}

/**
 * Callback method after data is saved. Reloads the data from the database and
 * rebuilds the page.
 * 
 * @param data
 *            The server response
 */
function saved(data) {
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", "./get.php?callback=fetched");
	$("head").append(newScriptElement);
	if (data.status == 'success') {
		Materialize.toast("Saved data successfully", 5000);
	}
}

/**
 * Opens the form window.
 */
function openForm() {
	$('#entryForm').modal('open');
}

/**
 * Closes the form window
 */
function closeForm() {
	$('#entryForm').modal('close');
}

/**
 * Opens the game panel
 */
function openGames() {
	$('#gameData').modal('open');
}

function openAbout() {
	$('#about').modal('open');
}
