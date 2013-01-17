
	EST.Datum = {
	
		// @return current date as 12232012 (ddmmyyyy) 
		createDate: function() {
			return "" + this.lpad((new Date()).getDate(), 2) + "" + this.lpad(((new Date()).getMonth() + 1), 2) + "" + (new Date()).getFullYear();
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
			var week1 = this.getWeek(date1Obj);
			var week2 = this.getWeek(date2Obj);
			console.log("weken: " + week1.week + ", " + week2.week);
			
			if (week1.year === week2.year) {
				if (week1.week === week2.week) {
					return true;
				}
			} else {
				if ((week1.week == 52 || week1.week == 53) && week2.week == 1) {
					return true;
				}
				if ((week2.week == 52 || week2.week == 53) && week1.week == 1) {
					return true;
				}
			}			
			
			return false;
		},
		
		/*
		lastSunday: function(dateObj) {
  			var d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDay(), 0, 0, 0 ,0);
  			console.log("lastSunday(): date: " + dateObj.getDate() + ", day: " + dateObj.getDay() + " = " + parseInt(dateObj.getDate() - dateObj.getDay()));
  			d.setDate(d.getDate() - d.getDay());
  			return d;
		},
		
		nextSunday: function(dateObj) {
  			var d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDay(), 0, 0, 0 ,0);
  			d.setDate((d.getDate() + 7) - d.getDay());
  			return d;
		},
		*/
		
		/**
		* Weeknr as needed for 
		* @param date as Date
		* @return week object with 'year' and 'week' int properties
		*/
		getWeek: function(d) {
			// Copy date so don't modify original
			d = new Date(d);
			d.setHours(0, 0, 0);			
			// Make Sunday's day number 0
			d.setDate(d.getDate() - d.getDay());
			// Get first day of year
			var yearStart = new Date(d.getFullYear(), 0, 1);
			// Calculate full weeks to nearest Thursday
			var weekNo = Math.ceil(( ( (d - yearStart) / 86400000)) / 7);
			
			var year = d.getFullYear();
			// if 1-st jan is not sunday, and date is before first jan, set year--;			
			//if (d.getDate() < 6) {
				//weekNo = 1;
				//year--;
			//}
			
			// Return array of year and week number
			return {"year": year, "week": weekNo};
		}
		
		/* // works, but problem with first/last week
		getWeek: function(d) {
			// Copy date so don't modify original
			d = new Date(d);
			d.setHours(0,0,0);
			// Set to nearest Thursday: current date + 4 - current day number
			// Make Sunday's day number 0
			d.setDate(d.getDate() + 4 - (d.getDay() || 0));
			// Get first day of year
			var yearStart = new Date(d.getFullYear(), 0, 1);
			// Calculate full weeks to nearest Thursday
			var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
			// Return array of year and week number
			return {"year": d.getFullYear(), "week": weekNo};
		}
		*/
	}
