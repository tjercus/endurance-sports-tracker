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
});
