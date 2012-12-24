
	// @todo update view when an item is added to collection
	EST.ActivitiesListView = Backbone.View.extend({
		tagName: "ul",
		className: "nav nav-tabs nav-stacked",

		initialize: function () {
			var that = this;
			this.collection.bind("reset", this.render, this);
			this.collection.bind("add", this.collectionAddHandler, this);
        },

		collectionAddHandler: function(activity) {
			this.$el.append(new EST.ActivityListItemView({model:activity}).render().el);

			EST.trigger("navigation:changed", "activities");
		},

		render: function () {
			//var that = this;

			var els = [];
			this.collection.each(function (act) {
				console.log("act: " + act);
				var itemView = new EST.ActivityListItemView({
					model: act
				});
				els.push(itemView.render().el);
			});
			this.$el.html(els);
			return this;
		}
	});