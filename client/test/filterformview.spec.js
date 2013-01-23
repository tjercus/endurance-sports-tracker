describe("EST.FilterFormView", function() {

	describe("#render", function() {

		it("should show model values in it's DOM element", function() {
        	EST.myForm = new EST.FilterFormView({model: new EST.Filter()});
            var el =  EST.myForm.render().el;

            expect(EST.myForm.model.get("onlyCurrentWeek")).toEqual(true);
            expect($(el).find("#onlycurrentweek").is(":checked")).toEqual(true);
         });
     });

     describe("events", function() {
     
		it("should update the model when view changes", function() {
			EST.myForm = new EST.FilterFormView({model: new EST.Filter()});			
			var el =  EST.myForm.render().el;
			
			$(el).find('#onlycurrentweek').click();			
											
			expect(EST.myForm.model.get("onlyCurrentWeek")).toEqual(false);				
		});
	});
});

