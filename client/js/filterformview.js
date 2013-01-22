
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form well",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" checked="<%= onlyCurrentWeek %>" /> Current week</label></div>',
	
	events: {
		"change #onlycurrentweek": "handleOnlyCurrentWeekViewChange"
	},
	
	initialize: function() {
		console.log("EST.FilterFormView INIT with model: " + JSON.stringify(this.model));
		// @todo pehaps use backbone.modelbinder
		//_.bindAll(this, "handleOnlyCurrentWeekViewChange");
		//_.bindAll(this, "handleOnlyCurrentWeekModelChange");
		
		this.model.on("change", this.handleOnlyCurrentWeekModelChange, this);		
	},
	
	handleOnlyCurrentWeekViewChange: function(evt) {
	 	console.log("1. handleOnlyCurrentWeekViewChange for model before change: " + JSON.stringify(this.model));
	 	this.model.set({"onlyCurrentWeek": $("#onlycurrentweek").is(":checked")});
	 	console.log("2. handleOnlyCurrentWeekViewChange setting model as: " + JSON.stringify(this.model) + ", throwing app event");
	 	EST.trigger("filter:changed", this.model.toJSON());
	},

	handleOnlyCurrentWeekModelChange: function(evt) {
		console.log("3. handleOnlyCurrentWeekModelChange for model: " + JSON.stringify(this.model) + ", re-rendering the view, no updates to model");
		//var icw = this.model.get("onlyCurrentWeek");
		//console.log("handleOnlyCurrentWeekModelChange: " + JSON.stringify(this.model) + ", updating view ...");
		//$("#onlycurrentweek").attr("checked", (icw ? "checked" : ""));
		this.render();
	},
	
	render: function() {
		this.$el.html(_.template(this.template, this.model.toJSON()));		
		return this;
	}
});
