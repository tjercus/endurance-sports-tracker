describe("EST.ActivityListItemView", function() {

	var view;

	beforeEach(function () {
		view = new EST.ActivityListItemView({});
	});

	describe("#render", function() {

		it("should render as a list item", function() {
			var model = new EST.Activity({id: 1, type: "running", date: "10112012", duration: 2200, distance: 12000, notes: "a nice run"});
			view.model = model;
			var el = view.render().el;

			expect($(el).html()).toEqual("<a>10-11-2012, running, 12km</a>");
		});
		
	});

});
