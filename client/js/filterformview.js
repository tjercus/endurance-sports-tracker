
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" /> Current week</label></div>',
	
	events: {
		"change #onlycurrentweek": "handleOnlyCurrentWeekChange"
	},
	
	initialize: function() {
	
	},
	
	handleOnlyCurrentWeekChange: function(evt) {
		console.log("toggle only current week");
		// @todo EST.trigger("onlycurrentweek:change", state);
	},
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
