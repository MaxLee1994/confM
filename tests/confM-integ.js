/**
 * @fileOverview confM integration test
 * @author Max
 * created at 2015-03-12 11:26
 */

var expect = require('expect.js');
var confM = require('../index');
var fs = require('fs');

var TEST_CONFIG_FILE = './tests/data/test-config.json';
var TEST_CONFIG_CHANGE_BEFORE_FILE = './tests/data/test-config-change.json';
var TEST_CONFIG_CHANGE_AFTER_FILE = './tests/data/test-config-change2.json';

describe('confM Integration Test', function() {

    it('normal', function() {
        var config = confM.create(TEST_CONFIG_FILE);

        expect(config.get('a')).to.be(1);
        expect(config.get('z')).to.be(undefined);
        expect(config.get('b')).to.be.an('object');
        expect(config.get('b', 'c')).to.be(2);
        expect(config.get('b', 'e')).to.be(undefined);
        expect(config.get('e')).to.be.an('array');
        expect(config.get('f', 'g')[0]).to.be(7);
        expect(config.getAll()).to.be.an('object');
    });

    it('file change', function(done) {
        this.timeout(100000);

        var config = confM.create(TEST_CONFIG_CHANGE_BEFORE_FILE);

        expect(config.get('a')).to.be(1);

        // for some reason
        // it has to be changed in this way
        // that the fs.watch callback would be invoked
        var action2 = function() {
            var configFileContent = JSON.parse(fs.readFileSync(TEST_CONFIG_CHANGE_BEFORE_FILE, {encoding: 'utf-8'}));
            configFileContent.a = 2;
            fs.writeFileSync(TEST_CONFIG_CHANGE_BEFORE_FILE, JSON.stringify(configFileContent));
        };

        setTimeout(action2, 0);


        var action = function() {
            expect(config.get('a')).to.be(2);

            var configFileContent = JSON.parse(fs.readFileSync(TEST_CONFIG_CHANGE_BEFORE_FILE, {encoding: 'utf-8'}));
            configFileContent.a = 1;
            fs.writeFileSync(TEST_CONFIG_CHANGE_BEFORE_FILE, JSON.stringify(configFileContent));

            done();
        };

        setTimeout(action, 1000);
    });
});
