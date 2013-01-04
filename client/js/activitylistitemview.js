
EST.ActivityListItemView = Backbone.View.extend({
		tagName: "tr",
		template: "<td><a><%= date %></a></td><td><%= type %></td><td><%= distance %></td><td><%= duration %></td><td><%= pace %></td>",

		render: function () {
			this.$el.append(_.template(this.template, this.model.toJSONFormatted()));
			return this;
		}
});
