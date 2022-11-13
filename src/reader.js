const currentDate = new Date(); // So I never have to change the date
var version = 0.1; // Version represented as decimal
console.log("RCSF (pure JS edition) v" + version.toString() + " renderer OFFICIAL\n\u00A9 Buggem " + currentDate.getFullYear()); // Making my life easier so I never have to update the year.
var rcsfname = "RCSF (pure JS edition) v" + version.toString() + " by Buggem";
window.rcsf = {
	"RCSFComic": class {
		constructor(somejson) {
			this.metadata = somejson.comicMeta;
			this.element = somejson.comicElem;
		}
	},
	"RCSFException": function(message = "") {
		this.name = "RCSFException";
		this.message = message;
	},
	"logs": false, // Do logs? boolean
	"render": function(comic, _callback) { // Main render function
		var cmcMeta = {
			id: comic[0][0],
			name: comic[0][1],
			author: comic[0][2],
			description: comic[0][3],
			series: comic[0][4],
			seriesid: comic[0][5]
		};
		var cmcContainer = document.createElement("div");
		cmcContainer.setAttribute("id", cmcMeta.id);
		for(let i = 1; i < comic.length; i++) {
			var thisPanel = document.createElement("div");
			thisPanel.innerHTML = comic[i];
			cmcContainer.appendChild(thisPanel);
		}
		if(typeof _callback === "function") {
			_callback(new this.RCSFComic({
				comicElem: cmcContainer,
				comicMeta: cmcMeta,
			}));
		}
	},
	"format": function(rawComic) {
		var comic = (rawComic).split('\n');
		comic[0] = comic[0].split("\uFFFD");
		return comic;
	},
	"loadWebcomic": function(url, _callback) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var comic = ""; // Won't be of type 'object' if fails and RCSFException fails
				try {
					comic = (this.responseText).split('\n');
					comic[0] = comic[0].split("\uFFFD");
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
window.rcsf.RCSFException.prototype = Error.prototype; // Make RCSFException of type Error (make it a throwable error)
