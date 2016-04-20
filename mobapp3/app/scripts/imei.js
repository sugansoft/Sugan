cordova.define("cordova/plugin/IMEIPlugin",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var IMEIPlugin = function () {};

    var IMEIPluginError = function(code, message) {
        this.code = code || null;
        this.message = message || '';
    };

    IMEIPlugin.NO_TELEPHONE_NUMBER = 0;

    IMEIPlugin.prototype.get = function(success,fail) {
        exec(success,fail,"IMEIPlugin",
            "get",[]);
    };

    var imeiNumber = new IMEIPlugin();
    module.exports = imeiNumber;
});

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.IMEIPlugin) {
    window.plugins.IMEIPlugin = cordova.require("cordova/plugin/IMEIPlugin");
}
