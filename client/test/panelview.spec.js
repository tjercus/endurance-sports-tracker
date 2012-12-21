describe("EST.PanelView", function() {

	var view;

	beforeEach(function () {
		view = new EST.PanelView({panelName: "dummy"});
	});

	describe("#initialize", function() {

		it("should hide by default", function() {
			expect($(view.el)).toBeHidden();
			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('none');
		});

		it("should display the panel when matching menu item clicked", function() {
			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('none');
			EST.trigger("subnavview:clicked", "dummy");
			expect($("body").find("[data-panelname='dummy']").css('display')).toEqual('block');
		});
	});

	describe("#show", function() {

		it("should show the element", function() {
			expect($("body").find("[data-panelname='dummy']").attr('style')).toEqual('display: none;');
			view.show();
			expect($("body").find("[data-panelname='dummy']").attr('style')).toEqual('display: block;');
		});

		it("should trigger a custom event", function() {
			spyOn(EST, "trigger");

			view.show();

			expect(EST.trigger).wasCalledWith("panel:shown", "dummy");
		});
	});

	describe("#hide", function() {

		it("should hide the element", function() {
			view.hide();
			expect($(view.el)).toBeHidden();
			expect($(view.el)).not.toBeVisible();
			// or: $("body").find("div['data-panelname'='dummy']").is(':visible');
		});
	});
});
