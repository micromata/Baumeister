import React from 'react';
import ReactDOM from 'react-dom';

const Component = React.createClass({ // eslint-disable-line no-unused-vars
	getInitialState() {
		return {counter: 0};
	},

	componentDidMount() {

	},

	handleOnClick() {
		this.setState({counter: this.state.counter + 1});
	},

	render() {
		return <div onClick={this.handleOnClick}>
			Hello, React! {this.state.counter}
		</div>;
	}
});

ReactDOM.render(<Component/>, document.getElementById('content'));
