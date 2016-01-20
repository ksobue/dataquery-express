var express = require("express");
var dqExpress = require(".");
var dqConfig = {
    constructor: require("dataquery-r"),
    options: {
        dirname: "/Users/ksobue/workspace_kokopelli/dataquery-express/test/data"
    }
};

var app = express();
app.use(express.static(__dirname + "/test"));
app.get("/execute", dqExpress(dqConfig));
app.listen(3000);
