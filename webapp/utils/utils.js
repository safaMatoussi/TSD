sap.ui.define([], function () {
	"use strict";

	var Module = {
		toggleButtonText: function(sId,stext){
			var oButton = this.getView().byId(sId);
			oButton.attachBrowserEvent("mouseover", function (oEvent) {
					oButton.setText(stext);
				});
			oButton.attachBrowserEvent("mouseout", function (oEvent) {
				oButton.setText("");
			});
		}
	};
	return Module;
});