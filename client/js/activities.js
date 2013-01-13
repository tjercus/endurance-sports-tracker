
	EST.Activities = Backbone.Collection.extend({
		url: "activities.groovy",
		model: EST.Activity,
						
		initialize: function(options) {
			var that = this;			
			
			if (options && options.shouldFilter) {
				EST.bind("filter:change", function(filter) {
					that.applyFilters(filter);
				});
			} else {
				this.on('add', function() {
					EST.trigger("activities:changed", _.clone(this.models));
				});
			}
		},

		getData: function() {			
			var totalDistance = 0;
			var totalDuration = 0;
			this.each(function (act) {
				totalDistance += parseInt(act.get('distance'));
				totalDuration += parseInt(act.get('duration'));
			});
			return {
				'nrOfActivities': this.length,
				'distance': (totalDistance / 1000) + "km",
				'duration': EST.Datum.secondsToTime(totalDuration),
				'averagePace': EST.Datum.secondsToTime( totalDuration / (totalDistance / 1000), true ),
				'averageDistance': ((totalDistance / this.length) / 1000).toFixed(2) + "km",
				'averageDuration': EST.Datum.secondsToTime(totalDuration / this.length),
			};			
		},
		
		applyFilters: function(filter) {
			// @todo apply filter model object to collection
			/*
			var filtered = [];
			this.each(function(act) {
				console.log("blah: " + act.get('date'));
				if (act.get('date') == '08012013') {
					filtered.push(act);
				}
			});
			this.reset(filtered);
			*/
			console.log("applying filters is being implemented");
		},
		
		comparator: function(item) {
        	return item.get("cid");// || item.get("cid");
    	}
	});
