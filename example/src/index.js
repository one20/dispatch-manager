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