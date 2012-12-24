
	// @todo extract to it's own libs namespace ex: Tjercus.Backbone.PanelView
	EST.PanelView = Backbone.View.extend({
		panelName: "",

		initialize: function (options) {
			if (options != null) {
				this.panelName = options.panelName;
				this.id = this.panelName + "-panel";
			}

			var that = this;
			EST.on("navigation:changed", function (navItemName) {
				console.log("Panel named '" + that.panelName + "' caught navigation event named '" + navItemName + "'");
				(that.panelName === navItemName) ? that.$el.show() : that.$el.hide();
			});

			// hide by default
			this.$el.hide();
		}
	});