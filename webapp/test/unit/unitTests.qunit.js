/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/solman/fb/TestSuiteDashboard_NewVersion/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});