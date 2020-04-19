sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../utils/utils"
], function (Controller, utils) {
	"use strict";

	return Controller.extend("com.sap.solman.fb.TestSuiteDashboard_NewVersion.controller.overviewPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.solman.fb.TestSuiteDashboard_NewVersion.view.overviewPage
		 */
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel();
			this.getView().setModel(oModel);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.solman.fb.TestSuiteDashboard_NewVersion.view.overviewPage
		 */
		onBeforeRendering: function () {
			utils.toggleButtonText.apply(this, ["selectParamsBt", "Selection Parameters"]);
			this.oVizFrame = this.getView().byId("idVizFrame");
			var pieChartModel = this.getOwnerComponent().getModel("chartModel");
			this.getView().byId("chartContainer").setBusy(true);
			//call data from ZR_TIMESet
			this.getOwnerComponent().getModel().read("/CHARTSet(configId=" + 1 + ",pageId=" + 1 + ",chartId=" + 1 + ")/ChartDATA",{ 
				success: function (oData, response) {

					this.getView().byId("chartContainer").setBusy(false);
					pieChartModel.setData(oData.results);
					this.oVizFrame.setModel(pieChartModel);
					this.oVizFrame.setVizProperties({
						plotArea: {
							dataLabel: {
								visible: true,
								formatString: [
									[]
								],
								type: 'value'
							},
							drawingEffect: "glossy"
						}
					});
					this.oVizFrame.setBusy(false);

				}.bind(this),
				error: function () {
					this.getView().byId("chartContainer").setBusy(false);
				}.bind(this)

			});
		},
		GoBack: function (evt) {
			var VisibilityModel = this.getOwnerComponent().getModel("VisibilityModel");
			VisibilityModel.setProperty("/overviewIsVisible", false);
			VisibilityModel.setProperty("/mainOverviewIsVisible", true);
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.solman.fb.TestSuiteDashboard_NewVersion.view.overviewPage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.solman.fb.TestSuiteDashboard_NewVersion.view.overviewPage
		 */
		//	onExit: function() {
		//
		//	}

	});

});