sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("customerform.controller.View1", {
        onInit() {
            this.callToDb();
        },

        callToDb: function () {
            let that = this
            return new Promise(function (resolve, reject) {
                let appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                let appPath = appId.replaceAll(".", "/");
                let appModulePath = jQuery.sap.getModulePath(appPath);
                $.ajax({
                    url: appModulePath + "/odata/Table_customersSet",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        resolve(that.getView().setModel(new JSONModel(data.d.results), "listModel"));
                    },
                    error: function (err, textStatus) {
                        reject(MessageBox.error(textStatus));
                    }
                });
            });
        }

    });
});