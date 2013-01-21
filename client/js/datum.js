
	/**
	* Util class to work wih dates in the context of this app
	* @author tjerk
	*/
	EST.Datum = {
	
		/**
		* @return current date as 12232012 (ddmmyyyy)
		*/
		createDate: function() {
			return "" + this.lpad((new Date()).getDate(), 2) + "" + this.lpad(((new Date()).getMonth() + 1), 2) + "" + (new Date()).getFullYear();
		},

		/**
		* @param secs the number of seconds since 
		* @param skipHours boolean to drop hours from result
		* @return the time as calculated from a number of seconds, as "hh:mm:ss" or "mm:ss"
		* @todo add days
		*/
		secondsToTime: function(secs, skipHours) {
			var SEP = ":";
			var hours = Math.floor(secs / (60 * 60)) || 0;
			var divisor_for_minutes = secs % (60 * 60);
			var minutes = Math.floor(divisor_for_minutes / 60) || 0;
			var divisor_for_seconds = divisor_for_minutes % 60 || 0;
			var seconds = Math.ceil(divisor_for_seconds) || 0;
			
			var paddedHours = "";
			if (skipHours != true) {
				paddedHours = this.lpad(hours, 2) + SEP;
			}
			
			var str = paddedHours + this.lpad(minutes, 2) + SEP + this.lpad(seconds, 2);
			return str;
		},
		
		/**
		* @param time as "hh:mm:ss"
		* @return nr of seconds in time as int
		*/
		timeToSeconds: function(time) {
			if (time === undefined || (time.indexOf(":") === -1)) {
				return time;
			}
			var components = time.split(":");			
			if (components.length === 3) {
				time = parseInt(components[0] * 3600) + parseInt(components[1] * 60) + parseInt(components[2]);
			}
			return time;
		},

		/**
		* @param date as Date object or numeric representation as: 12232012 (ddmmyyyy)
		* @return a String with a NL date
		*/
		formatDate: function(date) {
			var out = date, SEP = "-";
			if (_.isString(date)) {
				out = date.substr(0, 2) + SEP + date.substr(2, 2) + SEP + date.substr(4, 4);
			} else {
				out = this.lpad(date.getDate()) + SEP + this.lpad((date.getMonth() + 1)) + SEP + date.getFullYear();
			}			
			return out;
		},
		
		/**
		* @param value is the value to pad
		* @param padding is the size
		*/
		lpad: function(value, padding) {
		    var zeroes = "0";

    		for (var i = 0; i < padding; i++) { 
    			zeroes += "0"; 
    		}
    		return (zeroes + value).slice(padding * -1);
		},
		
		/**
		* @param numeric representation as: 12232012 (ddmmyyyy)
		* @return Date obj
		*/
		toDateObj: function(date) {
			if (!_.isString(date)) { 
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0);
				return date;
			}
			return new Date(date.substr(4, 4), parseInt(date.substr(2, 2)) - 1, date.substr(0, 2), 0, 0, 0, 0);
		},
		
		/**
		* @param date1 as Date object or numeric representation as: 12232012 (ddmmyyyy)
		* @param date2 as Date object or numeric representation as: 12232012 (ddmmyyyy)
		* @return isSameWeek boolean
		*/
		sameWeek: function(date1, date2) {
			var date1Obj = this.toDateObj(date1);
			var date2Obj = this.toDateObj(date2);
			if (date1Obj - date2Obj === 0) {
				return true;
			}
			
			var prevSunday1 = this.lastSunday(date1Obj);
			var prevSunday2 = this.lastSunday(date2Obj);
			
			if (prevSunday1 - prevSunday2 == 0) {
				return true;
			}				
			
			return false;
		},		
		
		/**
		* @param date obj
		* @return the last sunday before the given date
		*/
		lastSunday: function(dateObj) {
  			var prevSunday = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0, 0);
  			for (var i = 0; i < 6; i++) {
  			 	if (prevSunday.getDay() === 0) {
  			 		return prevSunday;
  			 	} else {
 					prevSunday.setDate(prevSunday.getDate() - 1);
  				}
  			}  			
  			return prevSunday;
		}
	}
