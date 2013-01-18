
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form well",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" /> Current week</label></div>',
	
	events: {
		"change #onlycurrentweek": "handleOnlyCurrentWeekViewChange"
	},
	
	initialize: function() {
		// @todo pehaps use backbone.modelbinder
		_.bindAll(this, "handleOnlyCurrentWeekViewChange");
		//this.model.on("change", this.handleOnlyCurrentWeekModelChange, this);
		EST.trigger("filter:changed", {"onlyCurrentWeek": true});
	},
	
	handleOnlyCurrentWeekViewChange: function(evt) {
		this.model.set({"onlyCurrentWeek": $("#onlycurrentweek").is(":checked")});
		EST.trigger("filter:changed", this.model);
	},
	
	/*
	handleOnlyCurrentWeekModelChange: function(evt) {
		var icw = this.model.get("onlyCurrentWeek");
		console.log("onlyCurrentWeek: " + icw);
		$("#onlycurrentweek").attr("checked", icw);
	},
	*/
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
