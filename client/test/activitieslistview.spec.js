describe("EST.ActivitiesListView", function() {

	var view;

	beforeEach(function () {
		/*
		EST.activities = ;
		*/
		view = new EST.ActivitiesListView({collection: new EST.Activities([
			{id: 1, type: "running", date: "10112012", duration: 2200, distance: 12000, notes: "a nice run"},
			{id: 2, type: "swimming", date: "09112012", duration: 1345, distance: 2700, notes: "a decent swim"},
			{id: 3, type: "swimming", date: "23082012", duration: 1234, distance: 4321, notes: "a nice swim"},
			{id: 4, type: "cycling", date: "23082012", duration: 76531, distance: 9500, notes: "a nice cycle ride"}
			])
		});
		view.render();
	});

	describe("#render", function() {

		it("should render a list", function() {
			var lies = $(view.el).find("tr");

			expect(lies.size()).toEqual(5); // thead>tr == 1 + tbody>th == 4 
		});

	});

	/*
	describe("#initialize", function() {

		it("should render on collection.add", function() {
			spyOn(EST.Activities, "initialize");

			view.collection.add({id: 5, type: "walking", date: "19082012", duration: 1234, distance: 4321, notes: "a nice walk"});

			expect(EST.Activities.render).toHaveBeenCalled();//With("add");
		});

	});
	*/

});
