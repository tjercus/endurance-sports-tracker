describe("EST.Datum", function() {
  
	describe("#secondsToTime", function() {
		it("should show hours by default", function() {
			var seconds = 4123;
			var time = EST.Datum.secondsToTime(seconds);
			expect(time).toEqual("01:08:43");
		});
		it("should skip hours when asked", function() {
			var seconds = 123;
			var time = EST.Datum.secondsToTime(seconds, true);
			expect(time).toEqual("02:03");
		});
	});
	
	describe("#timeToSeconds", function() {
		it("should convert timecomponents to seconds", function() {
			var time = "13:02:59";
			var seconds = EST.Datum.timeToSeconds(time);
			expect(seconds).toEqual(46979);
		});		
	});

	describe("#formatDate", function() {
    	it("should accept a Date object", function() {
			var dateObj = new Date(2008, 2, 1);
			var dateStr = EST.Datum.formatDate(dateObj);
			expect(dateStr).toEqual("01-03-2008");
		});
		it("should accept a numercic date represention", function() {
			var dateInt = "18051976";
			var dateStr = EST.Datum.formatDate(dateInt);
			expect(dateStr).toEqual("18-05-1976");
		});	
	});

	describe("#lpad", function() {
		it("should pad a number with two zeros", function() {
			var nr = EST.Datum.lpad(1, 2);
			expect(nr).toEqual('01');
		});
	});
	
	/*
	describe("#lastSunday", function() {
		it("should return sunday for a date in regular week", function() {
			var date = EST.Datum.lastSunday(new Date(2013, 0, 9));
			expect(date).toEqual(new Date(2013, 0, 6));
		});
		it("should return sunday for a date in a previous year", function() {
			var date = EST.Datum.lastSunday(new Date(2013, 0, 2));
			expect(date).toEqual(new Date(2012, 11, 30));
		});
	});
	*/
	
	describe("#sameWeek", function() {
		it("should return true if same date", function() {
			var date1 = "18051976";
			var date2 = "18051976";
			expect(EST.Datum.sameWeek(date1, date2)).toBeTruthy();
		});
		it("should return true if a week bridges two years", function() {
			var date1 = "31122012";
			var date2 = "01012013";
			expect(EST.Datum.sameWeek(date1, date2)).toBeTruthy();
		});
		it("should return true if a week bridges two months", function() {
			var date1 = "31012013";
			var date2 = "02022013";
			expect(EST.Datum.sameWeek(date1, date2)).toBeTruthy();
		});
		it("should return false if two dates are between and after a sunday", function() {
			var date1 = "05012013";
			var date2 = "07012013";
			expect(EST.Datum.sameWeek(date1, date2)).toBeFalsy();
		});
		it("should return false if two dates are before and on a sunday", function() {
			var date1 = "05012013";
			var date2 = "06012013";
			expect(EST.Datum.sameWeek(date1, date2)).toBeFalsy();
		});
		it("should return false if two dates are on a sunday and after", function() {
			var date1 = "06012013";
			var date2 = "07012013";
			expect(EST.Datum.sameWeek(date1, date2)).toBeTruthy();
		});
	});
	
	describe("#getWeek", function() {
		//it("should return number for a week bridging two years", function() {
			//var date = EST.Datum.lastSunday(new Date(2013, 0, 9));
			//expect(date).toEqual(new Date(2013, 0, 6));
		//});
		it("should return weekObj for the first week", function() {
			var weekObj = EST.Datum.getWeek(new Date(2013, 0, 2, 0, 0, 0, 0));
			expect(weekObj).toEqual({"year": 2012, "week": 52});
		});
		it("should return weekObj for the last week ('30-12-2012')", function() {
			var weekObj = EST.Datum.getWeek(new Date(2012, 11, 30, 0, 0, 0, 0));
			expect(weekObj).toEqual({"year": 2012, "week": 52});
		});
		it("should return weekObj for a regular week", function() {
			var weekObj = EST.Datum.getWeek(new Date(2013, 0, 8, 0, 0, 0, 0));
			expect(weekObj).toEqual({"year": 2013, "week": 1});
		});
	});
});
