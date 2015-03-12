/**
 * @fileOverview module entry
 * @author Max
 * created at 2015-03-11 23:00
 */

var fs = require('fs');


var Config = {
    create: function(filename, fileChangeCallback) {
        var obj = {};

        var _filename = filename;
        var _config;

        // constructor
        loadConfigFile();
        watchConfigFile();


        obj.get = function() {

            if(_config === undefined) return undefined;

            var result = _config;
            for(var i in arguments) {
                result = result[arguments[i]];
                if(result === undefined) {
                    return undefined;
                }
            }

            return result;
        };


        function loadConfigFile() {

            try {
                _config = JSON.parse(fs.readFileSync(_filename, {encoding: 'utf-8'}));
            } catch (e) {
                console.error('read config', _filename, 'failed!');
            }

        }

        function watchConfigFile() {

            fs.watch(_filename, function(event, filename) {

                if(fileChangeCallback) {
                    fileChangeCallback(event, filename);
                }

                if(event === 'rename') {
                    var pieces = _filename.split('/');
                    pieces[pieces.length - 1] = filename;
                    _filename = pieces.join('/');
                }

                loadConfigFile();
            });

        }


        return obj;
    }
};

exports.create = Config.create;
