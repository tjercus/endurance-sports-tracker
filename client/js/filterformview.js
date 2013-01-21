
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form well",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" checked="checked" /> Current week</label></div>',
	
	events: {
		"click #onlycurrentweek": "handleOnlyCurrentWeekViewChange"
	},
	
	initialize: function() {
		console.log("EST.FilterFormView INIT with model: " + JSON.stringify(this.model));
		// @todo pehaps use backbone.modelbinder
		_.bindAll(this, "handleOnlyCurrentWeekViewChange");
		_.bindAll(this, "handleOnlyCurrentWeekModelChange");
		
		this.model.on("change", this.handleOnlyCurrentWeekModelChange, this);
		//EST.trigger("filter:changed", {"onlyCurrentWeek": true});
		$("#onlycurrentweek").attr("checked", "checked");
	},
	
	handleOnlyCurrentWeekViewChange: function(evt) {
		console.log("handleOnlyCurrentWeekViewChange for model: " + JSON.stringify(this.model));
		this.model.set({"onlyCurrentWeek": $("#onlycurrentweek").is(":checked")});
		console.log("handleOnlyCurrentWeekViewChange setting model as: " + JSON.stringify(this.model));
		EST.trigger("filter:changed", this.model);
	},	

	handleOnlyCurrentWeekModelChange: function(evt) {
		var icw = this.model.get("onlyCurrentWeek");
		console.log("handleOnlyCurrentWeekModelChange: " + JSON.stringify(this.model) + ", updating view ...");
		$("#onlycurrentweek").attr("checked", icw);
	},
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
