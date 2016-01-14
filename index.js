"use strict";

let xml = require("xmldom");
let dq = require("dataquery");

function ExpressHandler(config) {
    if (config === undefined) {
        throw new Error("DataQuery configuration cannot be null.");
    }
    dq.DataQueryExecutor.configure(config);
    
    return function(request, response) {
        let requestXmlText = request.query["content"];
        let requestDoc = new xml.DOMParser().parseFromString(requestXmlText, "text/xml");
        let dataQueryRequestElem = requestDoc.documentElement;
        let dataQueryRequest = new dq.DataQueryRequestParser().parseFromXML(dataQueryRequestElem);

        dataQueryRequest.execute(function(err, dataQueryResponse) {
            if (err) {
                console.error("500: %o", err);
                response.writeHead(500);
                response.end();
                return;
            }

            let responseDoc = new xml.DOMImplementation().createDocument(null, null, null);
            let dataQueryResponseElem = new dq.DataQueryResponseSerializer(responseDoc).serializeToXML(dataQueryResponse);
            responseDoc.appendChild(dataQueryResponseElem);
            let responseXmlText = new xml.XMLSerializer().serializeToString(responseDoc);

            response.writeHead(200, {
                "Content-Type": "application/xml"
            });
            response.end(responseXmlText);
        });
    };
}

module.exports = ExpressHandler;
