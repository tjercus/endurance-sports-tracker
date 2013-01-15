
	EST.activities = new EST.Activities(EST.data);

	EST.filteredActivities = new EST.Activities(_.clone(EST.data), {"shouldFilter": true});

	EST.form = new EST.FormView({
		model: new EST.Activity()
	});

	EST.activitiesListView = new EST.ActivitiesListView({
		collection: EST.activities
	});

	EST.reportsView = new EST.ReportsView({
		collection: EST.activities
	});
	
	EST.filterFormView = new EST.FilterFormView({
		model: new EST.Filter()
	});
	
	EST.reportsFilteredView = new EST.ReportsView({
		collection: EST.filteredActivities
	});

	EST.appView = new EST.AppView({
		el: $("body")
	});

	EST.appView.render();

	console.log("appview is created and activitieslist is rendered");
