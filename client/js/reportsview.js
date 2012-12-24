
	EST.ReportsView = Backbone.View.extend({
		template: "<h1>Reports</h1>" +
		"<ul><li>Total distance: <%= totalDistance %></li>"+
		"<li>Total duration: <%= totalDuration %></li></ul>",

		initialize: function () {
			var that = this;
			this.collection.bind("reset", this.render, this);
			this.collection.bind("add", this.render, this);
        },

		render: function() {
			var json = this.collection.getTotals();
			var html = _.template(this.template, json);
			console.log(html);
			this.$el.html(html);

			return this;
		}
	});