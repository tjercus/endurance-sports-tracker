
	EST.ReportsView = Backbone.View.extend({
		template: "<h1>Reports</h1>" +
		"<ul><li>Total nr. of activities: <%= nrOfActivities %></li>" +
		"<li>Total distance: <%= distance %></li>" +
		"<li>Total duration: <%= duration %></li>" +
		"<li>Total average distance: <%= averageDistance %></li>" +
		"<li>Total average duration: <%= averageDuration %></li>" +
		"<li>Total average pace: <%= averagePace %></li>" +
		"</ul>",

		initialize: function () {
			var that = this;
			this.collection.bind("reset", this.render, this);
			this.collection.bind("add", this.render, this);
			/*EST.bind("activities:changed", function() {
				console.log("activities changed");
			});*/
        },

		render: function() {
			var json = this.collection.getData();
			var html = _.template(this.template, json);
			console.log(html);
			this.$el.html(html);

			return this;
		}
	});
