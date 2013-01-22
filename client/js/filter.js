
EST.Filter = Backbone.Model.extend({
	
	defaults: {
		"onlyCurrentWeek": true
		//"startDate": 
		//"endDate":
	},

	initialize: function(evt) {	
		this.set({"onlyCurrentWeek": true});
	}	
});
