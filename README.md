# dispatch-manager

## Install
`npm install --save dispatch-manager`

# Basic Usage
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
