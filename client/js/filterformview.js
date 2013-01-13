
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form",
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
		this.model.set({"onlyCurrentWeek": true}); // @todo het actual state from input field
		EST.trigger("filter:change", this.model);
	},
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
