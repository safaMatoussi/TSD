sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter'
], function (Controller, Filter) {
	"use strict";

	return Controller.extend("com.sap.solman.fb.TestSuiteDashboard_NewVersion.controller.mainView", {
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel();
			this.getView().setModel(oModel);
		},
		Apply: function (evt) {
			this.getOwnerComponent().getRouter().navTo("detailView");
			
			
			
			
			
			// var VisibilityModel = this.getOwnerComponent().getModel("VisibilityModel");
			// VisibilityModel.setProperty("/overviewIsVisible", true);
			// VisibilityModel.setProperty("/mainOverviewIsVisible", false);

			// var testPlanModel = this.getOwnerComponent().getModel("testPlanModel");
			// var selectedTestPlanList = testPlanModel.getProperty("/testPlanTitle");
			// var testPlanNumber = testPlanModel.getProperty("/testPlanTitle").length;
			// if (testPlanNumber !== 0) {
			// 	VisibilityModel.setProperty("/overviewIsVisible", true);
			// 	VisibilityModel.setProperty("/mainOverviewIsVisible", false);
			// 	if (testPlanNumber === 1) {
			// 		testPlanModel.setProperty("/labelForTitle", "Test Plan:");
			// 		testPlanModel.setProperty("/testPlanTitle", selectedTestPlanList[0]);
			// 	} else {
			// 		testPlanModel.setProperty("/labelForTitle", "Number of Test Plans:");
			// 		testPlanModel.setProperty("/testPlanTitle", selectedTestPlanList[0]);
			// 	}
			// }
		},
		onSelectRow: function (evt) {
			var testPlanModel = this.getOwnerComponent().getModel("testPlanModel");
			var oView = this.getView();
			var object = [];
			var selectedTestPlan;
			var oSelectedItem = evt.getSource().getSelectedItem();
			var Selected = evt.getParameter("selected");
			var SelectedRows = evt.getSource().getSelectedContexts();
			selectedTestPlan = SelectedRows.length;

			if (oSelectedItem !== null) {
				if (Selected === true) {
					testPlanModel.setProperty("/buttonEnablement", true);
					var oBindingContext = oSelectedItem.getBindingContext();
					var sPath = oBindingContext.getPath();
					var testPlanTitle = oView.getModel().getProperty(sPath + "/TITLE");
					object.push(testPlanTitle);
					testPlanModel.setProperty("/testPlanTitle", object);
				}
			} else if (selectedTestPlan === 0) {
				testPlanModel.setProperty("/buttonEnablement", false);
			}
		},
		handelppmProjItem: function (evt) {
			var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel();
			var FilterBarData = this.getOwnerComponent().getModel("FilterBarData");
			var FilterValuesModel = this.getOwnerComponent().getModel("FilterValuesModel");
			var oHelpDialog = new sap.m.SelectDialog({
				items: {
					path: "/CPROJECTSet",
					template: new sap.m.StandardListItem({
						title: "{cproName}"
					})
				},
				title: "Project",
				multiSelect: false,
				rememberSelections: true,
				contentHeight: "100%",
				confirm: function (e) {
					var selectedItem = e.getParameter("selectedItems")[0].getProperty("title");
					var path = e.getParameter("selectedContexts")[0].getPath();
					var projectGuid = oView.getModel().getProperty(path).cproGuid;
					var solutionId = oView.getModel().getProperty(path).solutionId;
					FilterValuesModel.setProperty("/projectGuid", projectGuid);
					FilterValuesModel.setProperty("/solutionId", solutionId);
					FilterBarData.setProperty("/waveValue", "");

					// var projectGuid = e.getParameter("selectedItems")[0].getProperty("desc");
					FilterBarData.setProperty("/waveEnablement", true);
					FilterBarData.setProperty("/projectValue", selectedItem);
					// FilterBarData.setProperty("/projectGuid",projectGuid);
				}
			});
			oHelpDialog.setModel(oModel);
			oHelpDialog.open();

		},
		handelWaveItem: function (evt) {
			var oModel = this.getOwnerComponent().getModel();
			var oView = this.getView();
			var FilterBarData = this.getOwnerComponent().getModel("FilterBarData");
			var VisibilityModel = this.getOwnerComponent().getModel("VisibilityModel");
			var FilterValuesModel = this.getOwnerComponent().getModel("FilterValuesModel");
			var projectGuid = FilterValuesModel.getProperty("/projectGuid");
			var oHelpDialog = new sap.m.SelectDialog({
				items: {
					path: "/WAVESet",
					template: new sap.m.StandardListItem({
						title: "{waveName}"
					})
				},
				title: "Project",
				multiSelect: false,
				rememberSelections: true,
				contentHeight: "100%",
				confirm: function (e) {
					var selectedItem = e.getParameter("selectedItems")[0].getProperty("title");
					FilterBarData.setProperty("/waveValue", selectedItem);
					VisibilityModel.setProperty("/fieldEditability", true);
					var path = e.getParameter("selectedContexts")[0].getPath();
					var waveId = oView.getModel().getProperty(path).waveId;
					FilterValuesModel.setProperty("/waveId", waveId);
				}
			});
			oHelpDialog.setModel(oModel);
			var oBinding = oHelpDialog.getBinding("items");
			var oFilter = new sap.ui.model.Filter("cproGuid", sap.ui.model.FilterOperator.EQ, projectGuid);
			oBinding.filter([oFilter]);
			oHelpDialog.open();
		},
		onSelectChangeMode: function (evt) {
			var VisibilityModel = this.getOwnerComponent().getModel("VisibilityModel");
			var FilterBarData = this.getOwnerComponent().getModel("FilterBarData");
			var selectedKey = evt.getSource().getSelectedKey();
			if (selectedKey === "1") {
				VisibilityModel.setProperty("/solutionIsVisible", true);
				VisibilityModel.setProperty("/projectIsMandatory", false);
				VisibilityModel.setProperty("/waveIsVisible", false);
				VisibilityModel.setProperty("/branchIsVisible", true);
				VisibilityModel.setProperty("/iconIsVisible", false);
				FilterBarData.setProperty("/projectValue", "");
				FilterBarData.setProperty("/waveValue", "");
			} else {
				VisibilityModel.setProperty("/solutionIsVisible", false);
				VisibilityModel.setProperty("/projectIsMandatory", true);
				VisibilityModel.setProperty("/waveIsVisible", true);
				VisibilityModel.setProperty("/branchIsVisible", false);
				VisibilityModel.setProperty("/iconIsVisible", true);
				FilterBarData.setProperty("/solutionValue", "");

			}

		},
		handelSolutionItem: function (data) {
			var oModel = this.getOwnerComponent().getModel();
			var VisibilityModel = this.getOwnerComponent().getModel("VisibilityModel");
			var FilterValuesModel = this.getOwnerComponent().getModel("FilterValuesModel");
			var FilterBarData = this.getOwnerComponent().getModel("FilterBarData");
			var oView = this.getView();
			var oHelpDialog = new sap.m.SelectDialog({
				items: {
					path: "/SOLUTIONSet",
					template: new sap.m.StandardListItem({
						title: "{solutionDescription}"
					})
				},
				title: "Solution",
				multiSelect: false,
				rememberSelections: true,
				contentHeight: "100%",
				confirm: function (e) {
					var selectedItem = e.getParameter("selectedItems")[0].getProperty("title");
					VisibilityModel.setProperty("/fieldEditability", true);
					FilterBarData.setProperty("/solutionValue", selectedItem);
					var path = e.getParameter("selectedContexts")[0].getPath();
					var solutionId = oView.getModel().getProperty(path).solutionGuid;
					FilterValuesModel.setProperty("/solutionId", solutionId);

				}
			});
			oHelpDialog.setModel(oModel);
			oHelpDialog.open();

		},
		beforeRebindTable: function (OEvent) {
			"use strict";
			var oBindingParams = OEvent.getParameter("bindingParams");
			var aFilters = oBindingParams.filters;

			this.checkFilters(aFilters);
		},
		checkFilters: function (aFilters) {
			var oCombinedFilter;
			oCombinedFilter = new sap.ui.model.Filter({
				filters: [],
				and: true
			});
			var FilterValuesModel = this.getOwnerComponent().getModel("FilterValuesModel");
			var FilterBarData = this.getOwnerComponent().getModel("FilterBarData");
			var projectGuid = FilterValuesModel.getProperty("/projectGuid");
			var projectFilter = new sap.ui.model.Filter("ppmGuid", sap.ui.model.FilterOperator.EQ, projectGuid);
			var waveId = FilterValuesModel.setProperty("/waveId");
			var waveFilter = new sap.ui.model.Filter("waveGuid", sap.ui.model.FilterOperator.EQ, waveId);
			var solutionId = FilterBarData.setProperty("/solutionId");
			var solutionFilter = new sap.ui.model.Filter("solution", sap.ui.model.FilterOperator.EQ, solutionId);
			var modeKey = FilterBarData.setProperty("/modeKey");
			var modeFilter = new sap.ui.model.Filter("mode", sap.ui.model.FilterOperator.EQ, modeKey);
			oCombinedFilter.aFilters.push(modeFilter);

			// if (solutionFilter !== "" && solutionFilter !== undefined) {
			// 	oCombinedFilter.aFilters.push(solutionFilter);
			// }
			if (waveFilter !== "" && waveFilter !== undefined) {
				oCombinedFilter.aFilters.push(waveFilter);
			}
			if (projectFilter !== "" && projectFilter !== undefined) {
				oCombinedFilter.aFilters.push(projectFilter);
			}

			// Push the filters the backEnd
			if (oCombinedFilter.aFilters.length > 0) {
				if (aFilters.length === 0) {
					aFilters[0] = oCombinedFilter;
				} else if (aFilters.length === 1) {
					if (aFilters[0].bAnd) {
						aFilters[0].aFilters.push(oCombinedFilter);
					} else {
						oCombinedFilter.aFilters.push(aFilters[0]);
						aFilters[0] = oCombinedFilter;
					}
				}
			}
		}
	});
});