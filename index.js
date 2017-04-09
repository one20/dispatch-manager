/*
* Dispatch Manager is a flux dispatcher helper/coordinator, allows react components to register and listen for events across the entire application.
* Creates a flux dispatcher instance for every action type registered.
*/

var Dispatcher = require('flux').Dispatcher;

class DispatchManager {
    constructor() {
        this.dispatchers = {};
    }
    /*
    * Registers a listener for a specific action. Creates a new dispatcher 
    * instance if one doesn't exist for the action already.
    * Returns token from flux dispatcher.
    */
    register(action, listener) {
        var dispatcher = this.getDispatcher(action);
        if (!dispatcher) {
            dispatcher = this.dispatchers[action] = new Dispatcher();
            dispatcher.callbackCount = 0;
        }
        dispatcher.callbackCount++;
        return dispatcher.register(listener);
    }

    /*
    * Finds the dispatcher instance associated with the action and 
    * unregisters a listener based on token.
    */
    unregister(action, token) {
        var dispatcher;
        if (dispatcher = this.getDispatcher(action)) {
            dispatcher.unregister(token);
            dispatcher.callbackCount--;
            if(!dispatcher.callbackCount){
                this.dispatchers[action] = null;
            }
            return true;
        }
        return false;
    }

    /*
    * Finds the dispatcher instance associated with the action 
    * and triggers all associated listeners.
    */
    dispatch(action, payload) {
        var dispatcher;
        if (dispatcher = this.getDispatcher(action)) {
            dispatcher.dispatch(payload);
            return true;
        }
        return false;
    }

    /*
    * Returns a dispatcher instance based on action.
    */
    getDispatcher(action) {
        if (this.dispatchers.hasOwnProperty(action)) {
            return this.dispatchers[action];
        }
        return false;
    }
}

//Return a single DispatchManager instance for all components.
module.exports = new DispatchManager();