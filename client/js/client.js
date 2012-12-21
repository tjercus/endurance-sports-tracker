"use strict";

$(window).load(function () {	

	window.EST = window.EST || {};
	_.extend(EST, Backbone.Events);

	EST.activityTypes = ["running", "swimming", "cycling", "walking"];
	
	//Backbone.Form.editors.Date.monthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

	EST.Activity = Backbone.Model.extend({
		url: "activities.groovy",

		defaults: {
			id: null,
			type: "running",
			date: new Date(),//Datum.createDate(),
			duration: 0,
			distance: 0,
			notes: ""
		},
		schema: {
			type: {
				type: "Select",
				options: EST.activityTypes
			},
			duration: { type: 'Number', validators: ['required'] },	// @todo create a Duration custom editor
			distance: "Number",
			notes: "TextArea",
			date: "Date" // @todo overwrite the getValue of this editor to return a Number
		},		

		getDateFormatted: function () {
			var raw = this.get("date");
			return Datum.formatDate(raw);
		},

		getDistanceFormatted: function () {
			return (this.get("distance") / 1000) + "km";
		},
		
		toJSONFormatted: function() {
			return {"date": this.getDateFormatted(), "type": this.get("type"), distance: this.getDistanceFormatted()};
		}
	});

	EST.Activities = Backbone.Collection.extend({
		url: "activities.groovy",
		model: EST.Activity,
		
		getTotals: function() {
			var totalDistance = 0;
			var totalDuration = 0;
			this.each(function (act) {
				totalDistance += parseInt(act.get('distance'));
				totalDuration += parseInt(act.get('duration'));
			});
			return {
				'totalDistance': (totalDistance / 1000) + "km",
				'totalDuration': Datum.secondsToTime(totalDuration)
			};
		}
	});

	EST.activities = new EST.Activities(EST.data);

	EST.ActivityListItemView = Backbone.View.extend({
		tagName: "li",
		template: "<a><%= date %>, <%= type %>, <%= distance %></a>",
		
		render: function () {
			this.$el.append(_.template(this.template, this.model.toJSONFormatted()));
			return this;
		}
	});

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
	
	EST.FormView = Backbone.Form.extend({	
		buttonTemplate: "<button id='save-button' class='btn btn-primary btn-large'>save</button>",
								
		initialize: function() {
		 	this.constructor.__super__.initialize.apply(this, arguments);
		 	console.log("EST.FormView extended initialize");
		 	_.bindAll(this, "render");
		 	_.bindAll(this, "handleSaveButton");
		 	var that = this;
		 	
		 	// @todo replace 'live'
		 	$("#save-button").live("click", function (evt) {
		 		evt.preventDefault();
		 		that.handleSaveButton(that);
			});
		},
		
		render: function() {
			this.constructor.__super__.render.apply(this, arguments);
			this.$el.find("fieldset").append(this.buttonTemplate);
			return this;
		},		

		reset: function () {
			//$(this.el)[0].reset();
			console.log("before: " + JSON.stringify(this.model.attributes));
			this.model.clear();
			this.model = new EST.Activity();

			// @todo iterate or other/smarter impl.
			this.setValue({
				"type": this.model.get('type')
			});
			this.setValue({
				"duration": this.model.get('duration')
			});
			this.setValue({
				"distance": this.model.get('distance')
			});
			this.setValue({
				"date": this.model.get('date')
			});
			this.setValue({
				"notes": this.model.get('notes')
			});
			console.log("after: " + JSON.stringify(this.model.attributes));
		},

		handleSaveButton: function(obj) {
			console.log("handleSaveButton started");			
			obj.commit(); // update form to model,
			//activity.save(); // POST model to url or store on localhost
			EST.activities.add(obj.model); // @todo use eventbus instead of direct coupling
			console.log(JSON.stringify(obj.model));
			console.log("new collection size: " + EST.activities.length);
			obj.reset();
		}
	});

	EST.form = new EST.FormView({
		model: new EST.Activity()
	});

	EST.activitiesListView = new EST.ActivitiesListView({
		collection: EST.activities
	});	
	
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
	
	EST.reportsView = new EST.ReportsView({
		collection: EST.activities
	});

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
			
			EST.navBar = new EST.NavBarView({
				el: $("ul.nav")
			});

			// set default panel state
			EST.trigger("navigation:changed", "activities");
		}
	});

	EST.appView = new EST.AppView({
		el: $("body")
	});
	EST.appView.render();

});
