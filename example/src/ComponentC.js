const React = require('react');
const DispatchManager = require('./../../index');

class ComponentC extends React.Component {
    onButtonClick() {
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