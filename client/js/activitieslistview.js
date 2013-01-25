
	EST.ActivitiesListView = Backbone.View.extend({
		tagName: "table",
		className: "table table-striped",
		
		theadTemplate: "<thead><tr><th>Date</th><th>Type</th><th>Distance (km)</th><th>Duration</th><th>Pace</th><th>Relative pace</th></tr></thead><tbody>",
		tfootTemplate: "</tbody>",

		initialize: function () {
			var that = this;
			this.collection.bind("reset", this.render, this);
			this.collection.bind("add remove", this.collectionChangeHandler, this);
        },

		collectionChangeHandler: function(activity) {
			this.$el.append(new EST.ActivityListItemView({model:activity}).render().el);

			EST.trigger("navigation:changed", "activities");
		},

		render: function () {
			var els = [];
			this.collection.each(function (act) {
				//console.log("act: " + JSON.stringify(act));
				var itemView = new EST.ActivityListItemView({
					model: act
				});
				var elRendered = itemView.render().el;
				//console.log("een rij: " + $(elRendered).html());
				els.push(elRendered);
			});			
			//console.log("tabel: " + this.theadTemplate + els.join("") + this.tfootTemplate);
			
			this.$el.html(this.theadTemplate);
			this.$el.append(els);
			this.$el.append(this.tfootTemplate);

			return this;
		}
	});
