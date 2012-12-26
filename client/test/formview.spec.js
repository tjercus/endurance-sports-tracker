describe("EST.form", function() {

	describe("form", function() {

		it("should show model values in it's DOM element", function() {
        	EST.myForm = new EST.FormView({model: new EST.Activity({"duration": 321, "distance": 123})});

            var el =  EST.myForm.render().el;

            //console.log($(el).html());

            expect(EST.myForm.model.get("duration")).toEqual(321);
            expect(EST.myForm.model.get("distance")).toEqual(123);

            expect($(el).find("#c0_duration").val()).toEqual('321');
            expect($(el).find("#c0_distance").val()).toEqual('123');
         });

		it("should keep values after panel is switched out and in", function() {
			EST.myForm = new EST.FormView({model: new EST.Activity({duration: 66})});

			expect(EST.myForm.model.get("duration")).toEqual(66);

			// choose another panel
			EST.trigger("navigation:changed", "activities");

			// set panel back to post
			EST.trigger("navigation:changed", "postnew");

			expect(EST.myForm.model.get("duration")).toEqual(66);
		});
/*
		it("should clear values after form is submitted", function() {
			EST.myForm = new EST.FormView({model: new EST.Activity({"duration": 321, "distance": 123})});
			var el =  EST.myForm.render().el;

            console.log($(el).html());

        	expect(EST.myForm.model.get("duration")).toEqual(321);
            expect(EST.myForm.model.get("distance")).toEqual(123);

            // @todo this does not work
            $(el).find("#save-button").trigger('click');

            expect(EST.myForm.model.get("duration")).toEqual(0);
       		expect(EST.myForm.model.get("distance")).toEqual(0);
        });
*/

	});
});

