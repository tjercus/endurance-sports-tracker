
	EST.Activities = Backbone.Collection.extend({
		url: "activities.groovy",
		model: EST.Activity,
						
		initialize: function(models, options) {
			var that = this;			
			
			if (options && options.shouldFilter) {
				// applicable for the filtered activities collection
				EST.bind("filter:changed", function(filter) {
					console.log("EST.Activities caught filter:changed");
					that.applyFilters(filter);
				});
				EST.bind("activities:changed", function(activities) {
					console.log("EST.Activities caught activities:changed, cloning activities collection to filteredactivities collection");
					that.reset(activities);
				});
			} else {
				// applicable for the main activities collection, unfiltered
				this.on("add remove reset", function() {
					EST.trigger("activities:changed", _.clone(this.models));
					console.log("EST.Activities trigger activities:changed");
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
			// @todo fix reset
			//this.reset(EST.activities);
			
			// @todo read filter model object, and apply all filters on same cumulative array
			var filtered = [];
			this.each(function(act) {				
				if (EST.Datum.sameWeek(EST.Datum.createDate(), act.get("date"))) {
					filtered.push(act);
				}
			});
			this.reset(filtered);
			
			console.log("filter is being applied");
		},
		
		comparator: function(item) {
        	return item.get("cid");// || item.get("cid");
    	}
	});
