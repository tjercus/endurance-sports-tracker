describe("EST.PanelView", function() {

	var view;

	beforeEach(function () {
		view = new EST.PanelView({panelName: "dummy"});		
		var el = view.render().el;
		$("body").append(el);
	});

	describe("#initialize", function() {

		it("should hide by default", function() {
			console.log("EL: " + $("body").html());
			//expect(view.$el).toBeHidden();

			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('none');
		});

		it("should display the panel when matching menu item clicked", function() {
			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('none');
			EST.trigger("subnavview:clicked", "dummy");
			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('block');
		});
	});	
});