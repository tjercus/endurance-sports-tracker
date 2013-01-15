
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form well",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" /> Current week</label></div>',
	
	events: {
		"change #onlycurrentweek": "handleOnlyCurrentWeekChange"
	},
	
	initialize: function() {
		// @todo pehaps use backbone.modelbinder
		_.bindAll(this, "handleOnlyCurrentWeekChange");
	},
	
	handleOnlyCurrentWeekChange: function(evt) {
		console.log("toggle only current week");
		this.model.set({"onlyCurrentWeek": true}); // @todo use the actual state from input field
		EST.trigger("filter:changed", this.model);
	},
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
