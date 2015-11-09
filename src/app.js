import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class App extends Component {

    render() {
        return <div>Hello {this.props.name}!</div>;
    }
}

App.propTypes = {
    name: PropTypes.string
};

render(<App />, document.getElementById('app'));
