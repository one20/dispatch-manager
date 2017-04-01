var assert = require('assert');
var DispatchManager = require('./../index');

var testToken;

describe('DispatchManager', function () {
    describe('#register()', function () {
        it('should return token', function () {
            testToken = DispatchManager.register('test', () => { });
            assert.notEqual(testToken, undefined);
            assert.notEqual(testToken, null);
        });
    });
    describe('#dispatch()', function () {
        it('can find existing dispatcher', function () {
            var dispatched = DispatchManager.dispatch('test');
            assert.equal(dispatched, true);
        });
        it('returns false if dipatcher does not exist for action', function () {
            var dispatched = DispatchManager.dispatch('test-not-registered');
            assert.notEqual(dispatched, 1);
        });
    });
    describe('#unregister', function () {
        it('returns true if dispatcher found, and called unregister with token', function () {
            var exists = DispatchManager.unregister('test', testToken);
            assert.equal(exists, 1);
        });
        it('returns false if unregistering an event that doesn\'t exist', function(){
            var doesntExistAnymore = DispatchManager.unregister('test-not-registered', testToken);
            assert.equal(doesntExistAnymore, false);
        });
    });
});