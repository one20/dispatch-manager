# DispatchManager

## Contents
* [Summary](#summary)
* [Install](#install)
* [Quick Start](#quick-start)
* [Methods](#methods)
* [Example](#example)

## Summary
`DispatchManager` is a module that makes working with events in React faster/easier. The goal is to have a single module that coordinates events between different components throughout your application.
`DispatchManager` uses `Dispatcher` instances from [flux](https://facebook.github.io/flux/docs/dispatcher.html) to organize your components' listeners by action.

## Install
`npm install --save dispatch-manager`

## Quick Start
Add the dispatch manager to your code
```javascript
const DispatchManager = require('dispatch-manager');
```

Register any listeners. First parameter is an action, use any string identifier. Second parameter is a function that will get called any time the action is dispatched.
```javascript
DispatchManager.register('some_action', myListener);
function myListener(payload){
  console.log(payload);
}
```

Call dispatch to trigger any functions listening to the same action. First parameter is the action (string identifier), second parameter is any data that you want to pass to listeners.
```javascript
DispatchManager.dispatch('some_action', { hello: 'world' });
```
## Methods

| **register**( action:```string```, listener:```function``` ):```string```     |
| :---------------------------------------------------------------------------- |
| Registers a function to be called when the specified action is dispatched. Returns a string token which can later be used to unregister the listener.    |

| **unregister**( action:```string```, token:```string``` ):```boolean```       |
| :---------------------------------------------------------------------------- |
| Unregisters a listener from the dispatcher associated with the specified action. Returns false if there is no dispatcher associated with the action.    |


| **dispatch**( action:```string```*[, payload:```object```]* ):```boolean```   |
| :---------------------------------------------------------------------------- |
| Triggers all listeners associated with the specified action. Optional payload as a second argument, accessed by the listener as the first parameter.    |

| **getDispatcher**( action:```string``` ):```Dispatcher```   |
| :---------------------------------------------------------------------------- |
| Returns the dispatcher object assigned to the specified action. Returns ```false``` if it doesn't exist.   |

## Example
*(Note: There is a working example that can be found in the 'example' folder. It was created using [create-react-app](https://github.com/facebookincubator/create-react-app), just run `npm start` within the folder.)*

This is an example of how multiple components can listen for the same event triggered by any component. Assume that our react application structure is the following:
```
index.js
  - ComponentA.js
  - ComponentB.js
    - ComponentC.js
```
---
index.js
```javascript
const React = require('react');
const ReactDOM = require('react-dom');
const ComponentA = require('./ComponentA');
const ComponentB = require('./ComponentB');

class App extends React.Component {
  render() {
    return (
      <div>
        <ComponentA/>
        <ComponentB/>
      </div>
    );
  }
}

ReactDOM.render( <App/>, document.getElementById('root') );
```
---
ComponentA.js
```javascript
const React = require('react');
const DispatchManager = require('dispatch-manager');

class ComponentA extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      actionHappened: false
    }

    /* 
    * Tell DispatchManager this component wants to know 
    * whenever 'some-action' is triggered in the app. 
    * When that happens, call onSomeAction().
    */
    DispatchManager.register( 'some-action', this.onSomeAction.bind(this) );
  }
  onSomeAction(){
    this.setState({ actionHappened : true });
  }
  render(){
    let message = (this.state.actionHappened) ? 'Some action happened!' : 'Listening for some action...' ;
    return (
      <div>A: {message}</div>
    );
  }
}

module.exports = ComponentA;
```
---
ComponentB.js
```javascript
const React = require('react');
const DispatchManager = require('dispatch-manager');
const ComponentC = require('./ComponentC');

class ComponentB extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      actionHappened: false
    }

    /* 
    * Tell DispatchManager this component also wants to know 
    * whenever 'some-action' is triggered in the app. 
    * When that happens, call onSomeAction().
    */
    DispatchManager.register( 'some-action', this.onSomeAction.bind(this) );
  }
  onSomeAction(){
    this.setState({ actionHappened : true });
  }
  render(){
    let message = (this.state.actionHappened) ? 'Some action happened!' : 'Listening for some action...' ;
    return (
      <div>
        <div>B: {message}</div>
        <ComponentC/>
      </div>
    );
  }
}

module.exports = ComponentB;
```
---
ComponentC.js
```javascript
const React = require('react');
const DispatchManager = require('dispatch-manager');

class ComponentC extends React.Component {
    onButtonClick() {
      /*
      * When the button is clicked, tell DispatchManager 
      * to tell any components listening to 'some-action'.
      * When dispatching, you can also pass data as the second
      * argument, which can be accessed as a parameter in the listeners.
      *
      * e.g DispatchManager.dispatch( 'some-action', { foo: 'bar' } );
      */
      DispatchManager.dispatch('some-action');
    }
    render() {
        return (
            <div>
                C: <input type="button" onClick={this.onButtonClick.bind(this)} defaultValue="DO 'some-action' !" />
            </div>
        );
    }
}

module.exports = ComponentC;
```
---
**Result**

Clicking the button on ComponentC should display 'Some action happened!' on both ComponentA & ComponentB.