var assert = require('assert');
var DispatchManager = require('./../index');

var testToken;

describe('DispatchManager', () => {
    describe('#constructor', () => {
        it('should only return one and the same instance', () => {
            var dm = require('./../index');
            assert.deepStrictEqual(DispatchManager, dm);
        })
    });
    describe('#register()', () => {
        it('should return token', () => {
            testToken = DispatchManager.register('test', () => { });
            assert.notEqual(testToken, undefined);
            assert.notEqual(testToken, null);
        });
    });
    describe('#dispatch()', () => {
        it('can find existing dispatcher', () => {
            var dispatched = DispatchManager.dispatch('test');
            assert.equal(dispatched, true);
        });
        it('returns false if dipatcher does not exist for action', () => {
            var dispatched = DispatchManager.dispatch('test-not-registered');
            assert.notEqual(dispatched, 1);
        });
    });
    describe('#unregister', () => {
        it('returns true if dispatcher found, and called unregister with token', () => {
            var exists = DispatchManager.unregister('test', testToken);
            assert.equal(exists, 1);
        });
        it('returns false if unregistering an event that doesn\'t exist', () => {
            var doesntExistAnymore = DispatchManager.unregister('test-not-registered', testToken);
            assert.equal(doesntExistAnymore, false);
        });
    });
});