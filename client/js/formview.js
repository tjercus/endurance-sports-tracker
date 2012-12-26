
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
			console.log("EST.FormView render");
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

			var errs = obj.commit(); // update form to model,
			if (_.isEmpty(errs)) {
				//activity.save(); // POST model to url or store on localhost
				EST.activities.add(obj.model); // @todo use eventbus instead of direct coupling
				console.log(JSON.stringify(obj.model));
				console.log("new collection size: " + EST.activities.length);
				obj.reset();
			}
		}
	});