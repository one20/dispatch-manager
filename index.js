var Dispatcher = require( 'flux' ).Dispatcher;

let instance = null;

class EventDispatcher {
    constructor() {
        this.dispatchers = {};
    }
    register(eventType, callback) {
        var dispatcher;
        if (this.dispatchers.hasOwnProperty(eventType)) {
            dispatcher = this.dispatchers[eventType];
        } else {
            dispatcher = this.dispatchers[eventType] = new Dispatcher();
        }
        return dispatcher.register(callback);
    }
    unregister(eventType, token) {
        var dispatcher = this.dispatchers[eventType];
        if (dispatcher) {
            dispatcher.unregister(token);
            return true;
        }
        return false;
    }
    dispatch(eventType, payload) {
        if (this.dispatchers.hasOwnProperty(eventType)) {
            var dispatcher = this.dispatchers[eventType];
            dispatcher.dispatch(payload);
            return true;
        }
        return false;
    }

    static get i() {
        if (!instance) {
            instance = new EventDispatcher();
        }
        return instance;
    };
}

module.exports = EventDispatcher.i;