/*eslint-disable no-console*/
"use strict";

let dq = require("dataquery");

window.addEventListener("load", function(_evt) {
    document.getElementById("submit").addEventListener("click", function(_evt) {
        let requestXmlText = document.getElementById("query").value;
        let requestDoc = new DOMParser().parseFromString(requestXmlText, "text/xml");
        let dataQueryRequestElem = requestDoc.documentElement;
        let dataQueryRequest = new dq.DataQueryRequestParser().parseFromXML(dataQueryRequestElem);
        dataQueryRequest.execute(function(err, _dataQueryResponse) {
            if (err) {
                console.error(err);
                console.error("[FAIL]");
                return;
            }
            
            console.log("[OK]");
        });
    }, false);
}, false);
