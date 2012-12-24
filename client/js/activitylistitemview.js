
EST.ActivityListItemView = Backbone.View.extend({
		tagName: "li",
		template: "<a><%= date %>, <%= type %>, <%= distance %></a>",

		render: function () {
			this.$el.append(_.template(this.template, this.model.toJSONFormatted()));
			return this;
		}
});