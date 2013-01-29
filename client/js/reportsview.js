
	EST.ReportsView = Backbone.View.extend({

		id: "reports",

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
        },

		render: function() {

			var chartOptions = {
	            chart: {
	                renderTo: "chart",
	                type: 'column'
	            },
	            title: {
	                text: 'Distance per activity'
	            },
	            xAxis: {
	                categories: []
	            },
	            yAxis: {
	                min: 1,
	                title: {
	                    text: 'Distance'
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                backgroundColor: '#FFFFFF',
	                align: 'left',
	                verticalAlign: 'top',
	                x: 100,
	                y: 70,
	                floating: true,
	                shadow: true
	            },
	            tooltip: {
	                formatter: function() {
	                    return this.y +' km';
	                }
	            },
	            plotOptions: {
	                column: {
	                    pointPadding: 0.2,
	                    borderWidth: 0
	                }
	            },
	            series: []
        	};

        	var series = {
                data: []
            };
            var categories = [];

			// @todo replace expr chart function
			distances = [];
			_.each(EST.activities.models, function(act) {
                series.name = "Volume";
                series.data.push(act.get('distance') / 1000);
                categories.push(act.get('datum'));
			});
			chartOptions.series.push(series);
			chartOptions.xAxis.categories = categories;

			//$("<div id='chart'></div>").appendTo("#content");

			var json = this.collection.getData();
			var html = _.template(this.template, json);
			
			this.$el.html(html);

			new Highcharts.Chart(chartOptions);

			return this;
		}
	});
