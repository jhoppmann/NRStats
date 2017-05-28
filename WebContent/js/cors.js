/**
 * Creates a new CORS request for method and URL
 */
var createCORSRequest = function(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// For older internet Explorers
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
};
