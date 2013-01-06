
	EST.Datum = {
		createDate: function() {
			return (new Date()).getDate() + "" + ((new Date()).getMonth() + 1) + "" + (new Date()).getFullYear();
		},

		// @todo add days
		secondsToTime: function(secs, skipHours) {
			var SEP = ":";
			var hours = Math.floor(secs / (60 * 60));
			var divisor_for_minutes = secs % (60 * 60);
			var minutes = Math.floor(divisor_for_minutes / 60);
			var divisor_for_seconds = divisor_for_minutes % 60;
			var seconds = Math.ceil(divisor_for_seconds);
			
			var paddedHours = "";			
			if (skipHours != true) {
				paddedHours = this.lpad(hours, 2) + SEP;
			}
						
			var str = paddedHours + this.lpad(minutes, 2) + SEP + this.lpad(seconds, 2);
			return str;
		},

		/**
		* @param date as Date object or numeric representation as: 12232012 (mmddyyyy)
		* @return a String with a NL date
		*/
		formatDate: function(date) {
			var out = date, SEP = "-";
			if (_.isString(date)) {
				out = date.substr(0, 2) + SEP + date.substr(2, 2) + SEP + date.substr(4, 4);
			} else {
				out = this.lpad(date.getDate()) + SEP + this.lpad((date.getMonth() + 1)) + SEP + date.getFullYear();
			}

			console.log("out was: " + out + ", from: " + date);
			return out;
		},
		
		lpad: function(value, padding) {
		    var zeroes = "0";

    		for (var i = 0; i < padding; i++) { 
    			zeroes += "0"; 
    		}
    		return (zeroes + value).slice(padding * -1);
		}

	}
