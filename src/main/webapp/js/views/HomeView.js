/*jslint browser: true */
define([
	'handlebars',
	'views/BaseView',
	'views/MapView',
	'views/SelectModelView',
	'models/SelectionModel',
	'collections/ModelCollection',
	'utils/logger',
	'text!templates/home.html'
], function (Handlebars, BaseView, MapView, SelectModelView, SelectionModel, ModelCollection, log, hbTemplate) {
	"use strict";

	var view = BaseView.extend({
		template: Handlebars.compile(hbTemplate),
		events: {
			'click #button-save-session': 'saveSession',
			'click #button-help': 'displayHelp'
		},
		/*
		 * Renders the object's template using it's context into the view's element.
		 * @returns {extended BaseView}
		 */
		render: function () {
			BaseView.prototype.render.apply(this, arguments);
			this.mapView.render();
			this.selectModelView.setElement(this.$('#model-selection-container')).render();
			this.modelCollection.fetch();
			return this;
		},
		/*
		 * @constructs
		 * @param {Object} options
		 *		@prop router {Backbone.Router instance} - defaults to null
		 *		@prop template {Function} optional - Returns html to be rendered. Will override the template property.
		 *		@prop context {Object} to be used when rendering templateName - defaults to {}
		 *      @prop el {Jquery element} - render view in $el.
		 */
		initialize: function (options) {
			// This model collection of Sparrow models  will feed into multiple
			// views so create it here at the top level and pass it into multiple
			// views in order so that they can decorate their controls
			this.modelCollection = new ModelCollection();

			this.selectionModel = new SelectionModel();

			this.mapView = new MapView({
				mapDivId: 'map-container',
				enableZoom: false
			});

			this.selectModelView = new SelectModelView({
				collection: this.modelCollection,
				el: '.model-selection-container'
			});
			BaseView.prototype.initialize.apply(this, arguments);
		},
		remove: function () {
			this.mapView.remove();
			this.selectModelView.remove();
			BaseView.prototype.remove.apply(this, arguments);
		},
		saveSession: function () {
			log.debug("Save session button clicked");
		},
		displayHelp: function () {
			log.debug("Display help button clicked");
		}
	});

	return view;
});
