const React = require('react');
const DispatchManager = require('./../../index');
const ComponentC = require('./ComponentC');

class ComponentB extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      actionHappened: false
    }

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