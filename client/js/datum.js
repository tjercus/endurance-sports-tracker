
	window.Datum = {
		createDate: function() {
			return (new Date()).getDate() + "" + ((new Date()).getMonth() + 1) + "" + (new Date()).getFullYear();
		},

		// @todo add days
		secondsToTime: function(secs) {
			var SEP = ":";
			var hours = Math.floor(secs / (60 * 60));
			var divisor_for_minutes = secs % (60 * 60);
			var minutes = Math.floor(divisor_for_minutes / 60);
			var divisor_for_seconds = divisor_for_minutes % 60;
			var seconds = Math.ceil(divisor_for_seconds);
			return hours + SEP + minutes + SEP + seconds;
		},
		
		formatDate: function(date) {
			var out = date, SEP = "-";			
			if (_.isString(date)) {
				out = date.substr(0, 2) + SEP + date.substr(2, 2) + SEP + date.substr(4, 4);				
			} else {
				out = date.getDate() + SEP + (date.getMonth() + 1) + SEP + date.getFullYear();
			}
			 
			console.log("out was: " + out + ", from: " + date);
			return out;
		}		
	}
