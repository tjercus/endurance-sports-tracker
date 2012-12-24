
EST.Activity = Backbone.Model.extend({
		url: "activities.groovy",

		defaults: {
			id: null,
			type: "running",
			date: new Date(),
			duration: 0,
			distance: 0,
			notes: ""
		},
		schema: {
			type: {
				type: "Select",
				options: ["running", "swimming", "cycling", "walking"],
			},
			duration: { type: 'Number', validators: ['required'] },	// @todo create a Duration custom editor
			distance: "Number",
			notes: "TextArea",
			date: "Date" // @todo overwrite the getValue of this editor to return a Number
		},

		getDateFormatted: function () {
			var raw = this.get("date");
			return EST.Datum.formatDate(raw);
		},

		getDistanceFormatted: function () {
			return (this.get("distance") / 1000) + "km";
		},

		toJSONFormatted: function() {
			return {"date": this.getDateFormatted(), "type": this.get("type"), distance: this.getDistanceFormatted()};
		}
});