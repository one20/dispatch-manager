/*
* Dispatch Manager is a flux dispatcher helper/coordinator, allows react components to register and listen for events across the entire application.
* Creates a flux dispatcher instance for every action type registered.
*/

var Dispatcher = require( 'flux' ).Dispatcher;

class DispatchManager {
    constructor() {
        this.dispatchers = {};
    }
    /*
    * Registers a callback for a specific action. Creates a new dispatcher 
    * instance if one doesn't exist for the action already.
    * Returns token from flux dispatcher.
    */
    register(action, callback) {
        var dispatcher;
        if (this.dispatchers.hasOwnProperty(action)) {
            dispatcher = this.dispatchers[action];
        } else {
            dispatcher = this.dispatchers[action] = new Dispatcher();
        }
        return dispatcher.register(callback);
    }

    /*
    * Finds the dispatcher instance associated with the action and 
    * unregisters a listener based on token.
    */
    unregister(action, token) {
        var dispatcher = this.dispatchers[action];
        if (dispatcher) {
            dispatcher.unregister(token);
            return true;
        }
        return false;
    }

    /*
    * Finds the dispatcher instance associated with the action 
    * and triggers all associated listeners.
    */
    dispatch(action, payload) {
        if (this.dispatchers.hasOwnProperty(action)) {
            var dispatcher = this.dispatchers[action];
            dispatcher.dispatch(payload);
            return true;
        }
        return false;
    }
}

//Return a single DispatchManager instance for all components.
module.exports = new DispatchManager();