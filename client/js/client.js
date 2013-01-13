
	//Backbone.Form.editors.Date.monthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

	EST.activities = new EST.Activities(EST.data);
	
	EST.filteredActivities = new EST.Activities({"shouldFilter": true});

	console.log("activities is created");

	EST.form = new EST.FormView({
		model: new EST.Activity()
	});

	console.log("form is created");

	EST.activitiesListView = new EST.ActivitiesListView({
		collection: EST.activities
	});

	console.log("activitieslistview is created");

	EST.reportsView = new EST.ReportsView({
		collection: EST.activities
	});

	console.log("reportsview is created");
	
	EST.filterFormView = new EST.FilterFormView({
		model: new EST.Filter()
	});
	
	EST.reportsFilteredView = new EST.ReportsView({
		collection: EST.filteredActivities
	});

	console.log("reportsfilteredview is created");

	EST.appView = new EST.AppView({
		el: $("body")
	});

	console.log("appview is created");

	EST.appView.render();

	console.log("activitieslist is rendered");
