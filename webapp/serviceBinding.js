function initModel() {
	var sUrl = "/sap/opu/odata/salm/TEST_SUIT_DASHBOARD_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}