const React = require('react');
const DispatchManager = require('dispatch-manager');

class ComponentA extends React.Component {
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
      <div>A: {message}</div>
    );
  }
}

module.exports = ComponentA;