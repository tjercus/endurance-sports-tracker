
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
				return date;
			}
			return new Date(date.substr(4, 4), parseInt(date.substr(2, 2)) - 1, date.substr(0, 2), 0, 0, 0);
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
			
			// 1. determine week boundaries of first date
			// 1.a get last sunday
						
			//var startDay = 0;
			//var weekStart = new Date(date1Obj.getDate() - (7 + date1Obj.getDay() - startDay) % 7);
			//var weekEnd = new Date(date1Obj.getDate() + (7 - date1Obj.getDay() - startDay) % 7);
			var prevSunday = date1Obj.getDate() - date1Obj.getDay();
			console.log("prevSunday: " + prevSunday + ", for " + date1Obj);
			
			// 2. check if second date is betwee boundaries of first date
			//if (date2Obj >= weekStart && date2Obj <= weekEnd) {
			//	return true;
			//}
			
			//console.log(date1Obj);
			//console.log(date2Obj);
			return false;
		}		
	}
