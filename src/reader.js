const currentDate = new Date(); // So I never have to change the date
var version = 0.1; // Version represented as decimal
console.log("RCSF (pure JS edition) v" + version.toString() + " renderer OFFICIAL\n\u00A9 Buggem " + currentDate.getFullYear()); // Making my life easier so I never have to update the year.
var pxname = "RCSF (pure JS edition) v" + version.toString() + " by Buggem";
var pmp5 = {
	"RCSFException": function(message = "") {
		this.name = "RCSFException";
		this.message = message;
	},
	"logs": false, // Do logs? boolean
	"render": function(pm, pos, sketch) { // Main render function
		
	},
	"loadWebcomic": function(url, _callback) { // Newly added load feature
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var comic = ""; // Won't be of type 'object' if fails and RCSFException fails
				try {
					comic = (this.responseText).split('\n');
				} catch {
					throw new this.RCSFException("Unable to parse URL response.");
				}
				if(typeof comic == 'object' && typeof _callback == 'function') {
					_callback(comic);
				}
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
};
pmp5.RCSFException.prototype = Error.prototype; // Make RCSFException of type Error (make it a throwable error)
