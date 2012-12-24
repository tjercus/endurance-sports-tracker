
	// @todo extract to it's own libs namespace ex: Tjercus.Backbone.NavBarView
	EST.NavBarView = Backbone.View.extend({
		initialize: function () {
			var that = this;
			this.$el.bind("click", function (event) {
				// put delegated event on application-wide eventbus
				var link = $(event.target);
				// remove all actve classes from li's
				that.$el.find("li").removeClass("active");

				var tabName = "unknown";
				if ($(link).attr('href') !== undefined) {
					tabName = $(link).attr("href").substr(1);
					$(link).parent().addClass("active");
				}
				console.log("a tab was clicked: [" + tabName + "]");
				EST.trigger("navigation:changed", tabName);
			});
		}
	});