$(document).ready(loadFromNRDB());

/**
 * Loads cards from NetrunnderDB
 * 
 * @returns
 */
function loadFromNRDB() {
	var url = 'https://netrunnerdb.com/api/2.0/public/cards';
	var method = 'GET';
	var xhr = createCORSRequest(method, url);

	xhr.onload = function() {
		console.log("Success!")
		consumeResponse(JSON.parse(xhr.responseText));
	};

	xhr.onerror = function() {
		console.log("Fetching from NRDB failed");
	};

	console.log("Calling NRDB for IDs...")
	xhr.send();
}

/**
 * Uses the response from NRDB and sets the identities to the select boxes
 * 
 * @param response
 *            Response from NRDB
 */
function consumeResponse(response) {
	var identities = [];
	response.data.forEach(function(line) {
		if (line.type_code == 'identity' && line.pack_code != 'draft') {
			identities.push(line);
		}
	});

	console.log("Fetched " + response.data.length + " cards, "
			+ identities.length + " are identities.");
	identities.sort(function(a, b) {
		if (a.title < b.title)
			return -1;
		if (a.title > b.title)
			return 1;
		return 0;
	});

	identities.forEach(function(line) {
		if (line.side_code == "runner") {
			$('#runnerId').append($('<option>', {
				value : escapeHtml(line.title),
				text : line.title
			}));
		} else {
			$('#corpId').append($('<option>', {
				value : escapeHtml(line.title),
				text : line.title
			}));
		}
	});
	// initialize selects after content is set
	$('select').material_select();
}

/**
 * Sets html tags for characters
 * 
 * @param string
 *            The string to use
 * @returns A string with html escaped
 */
function escapeHtml(string) {
	return $('<div/>').text(string).html();
}
