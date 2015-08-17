define([
	"backbone",
	"sinon",
	'controller/AppRouter'
], function (Backbone, sinon, Router) {
	xdescribe("Router", function () {
		beforeEach(function () {
			this.router = new Router();
			this.routeSpy = sinon.spy();
			this.router.bind("route:homeView", this.routeSpy);

			try {
				Backbone.history.start({silent: true});
			} catch (e) {
			}
			this.router.navigate("elsewhere");
		});

		it("does not fire for unknown paths", function () {
			this.router.navigate("unknown", true);
			expect(this.routeSpy.notCalled).toBeTruthy();
		});

		it("fires the default root with a blank hash", function () {
			this.router.navigate("", true);
			expect(this.routeSpy.calledOnce).toBeTruthy();
			expect(this.routeSpy.calledWith(null)).toBeTruthy();
		});
	});
});