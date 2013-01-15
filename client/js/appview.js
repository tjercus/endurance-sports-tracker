
	EST.AppView = Backbone.View.extend({

		initialize: function () {			
			
			EST.activitiesPanel = new EST.PanelView({
				panelName: "activities"
			});
			EST.reportsPanel = new EST.PanelView({
				panelName: "reports"
			});
			EST.postnewPanel = new EST.PanelView({
				panelName: "postnew"
			});

			var contentEl = this.$el.find("#content");

			contentEl.append(EST.activitiesPanel.el);
			contentEl.append(EST.reportsPanel.el);
			contentEl.append(EST.postnewPanel.el);

			$(EST.activitiesPanel.el).append(EST.activitiesListView.render().el);

			$(EST.postnewPanel.el).append(EST.form.render().el);

			$(EST.reportsPanel.el).append(EST.reportsView.render().el);
			$(EST.reportsPanel.el).append(EST.filterFormView.render().el);
			$(EST.reportsPanel.el).append(EST.reportsFilteredView.render().el);

			console.log("AppView.init. views rendered and added to panels");

			EST.navBar = new EST.NavBarView({
				el: $("ul.nav")
			});

			// set default panel state
			EST.trigger("navigation:changed", "activities");
			//EST.trigger("activities:changed", EST.activities);
		}
	});
