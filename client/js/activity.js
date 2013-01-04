
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
			distance: { type: 'Number', validators: ['required'] },
			notes: "TextArea",
			date: "Date" // @todo overwrite the getValue of this editor to return a Number
		},

		validate: function(attrs) {
			var errors = {};
            if (parseInt(attrs.duration) <= 0) {
            	errors.duration = 'duration should be bigger than zero';
            }
            if (parseInt(attrs.distance) <= 0) {
            	errors.distance = 'distance should be bigger than zero';
            }
            if (!_.isDate(attrs.date)) {
               	errors.date = 'date is not a valid date';
            }
            if (errors.duration || errors.distance|| errors.date) {
            	return errors;
            }
        },

		getDateFormatted: function () {
			var raw = this.get("date");
			return EST.Datum.formatDate(raw);
		},

		getDistanceFormatted: function () {
			return (this.get("distance") / 1000) + "km";
		},
		
		getDurationFormatted: function () {
			return EST.Datum.secondsToTime(this.get("duration"));
		},
		
		getPaceFormatted: function() {
			return EST.Datum.secondsToTime( this.get("duration") / (this.get("distance") / 1000), true );
		},		

		toJSONFormatted: function() {
			return {
				"date": this.getDateFormatted(),
				"type": this.get("type"), 
				"distance": this.getDistanceFormatted(), 
				"duration": this.getDurationFormatted(), 
				"pace": this.getPaceFormatted()
			};
		}
});
