describe("EST.form", function() {

//	var view;
//	beforeEach(function () {
//		this.view = EST.form;
//	});

	describe("form", function() {

		
		it("should keep values after panel is switched out and in", function() {

			//if (EST.form === undefined) {
			EST.myForm = new EST.FormView();
			//}

			// first set some form value(s)
			EST.myForm.setValue({duration: 66});
			EST.myForm.commit(); // sync view and model
			expect(EST.myForm.model.get("duration")).toEqual(66);

			// choose another panel
			EST.trigger("navigation:changed", "activities");

			// set panel back to post
			EST.trigger("navigation:changed", "postnew");

			//expect($("#content").find("select[name='duration']").value().toEqual('69');
			expect(EST.myForm.model.get("duration")).toEqual(66);
		});
		
/*
		it("should clear values after form is submitted", function() {
        	// first set some form value(s)
        	EST.form.setValue({duration: 321});
        	EST.form.setValue({distance: 123});
           // EST.form.commit(); // sync view and model

            // @todo this does not work
            $(EST.form.el).find("#save-button").click();//("click");
            //EST.form.submit();
            console.log(EST.form.el);

            expect(EST.form.model.get("duration")).toEqual(0);
       		expect(EST.form.model.get("distance")).toEqual(0);
        });
        */
	});
});

