describe("EST.ActivityListItemView", function() {

	var view;

	beforeEach(function () {
		view = new EST.ActivityListItemView({});
	});

	describe("#render", function() {

		it("should render as a table row", function() {
			var model = new EST.Activity({id: 1, type: "running", date: "10112012", duration: 2200, distance: 12000, notes: "a nice run"});
			view.model = model;
			var el = view.render().el;

			expect($(el).html()).toEqual("<td><a>10-11-2012</a></td><td>running</td><td class=\"numeric\">12</td><td>00:36:40</td><td>03:04</td><td>164</td>");
		});
		
	});

});
