
EST.FilterFormView = Backbone.View.extend({
	tagName: "form",
	className: "horizontal-form well",
	template: '<h2>Filters</h2><div class="control-group"><label class="checkbox"><input type="checkbox" id="onlycurrentweek" checked="<%= onlyCurrentWeek %>" /> Current week</label></div>',
	
	events: {
		"click #onlycurrentweek": "handleOnlyCurrentWeekViewChange"
	},
	
	handleOnlyCurrentWeekViewChange: function(evt) {
	 	var checked = $("#onlycurrentweek").is(":checked");	 		 	
	 	this.model.set({"onlyCurrentWeek": checked});
	 	EST.trigger("filter:changed", this.model.toJSON());
	},
	
	render: function() {
		this.$el.html(_.template(this.template, this.model.toJSON()));		
		return this;
	}
});
