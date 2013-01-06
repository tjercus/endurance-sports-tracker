
	EST.Activities = Backbone.Collection.extend({
		url: "activities.groovy",
		model: EST.Activity,

		getTotals: function() {
			var totalDistance = 0;
			var totalDuration = 0;
			this.each(function (act) {
				totalDistance += parseInt(act.get('distance'));
				totalDuration += parseInt(act.get('duration'));
			});
			return {
				'totalNrOfActivities': this.length,
				'totalDistance': (totalDistance / 1000) + "km",
				'totalDuration': EST.Datum.secondsToTime(totalDuration),
				'totalAveragePace': EST.Datum.secondsToTime( totalDuration / (totalDistance / 1000), true ),
				'totalAverageDistance': ((totalDistance / this.length) / 1000).toFixed(2) + "km",
				'totalAverageDuration': EST.Datum.secondsToTime(totalDuration / this.length),
			};
		},
		
		comparator: function(item) {
        	return item.get("cid");// || item.get("cid");
    	}
	});
