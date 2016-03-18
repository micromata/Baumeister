import React from 'react';
import ReactDOM from 'react-dom';

const SimpleComponentWithoutLogic = React.createClass({ // eslint-disable-line no-unused-vars
	render() {
		return <p>Hello, my name is {this.props.name}</p>;
	}
});

const getInitialData = () => Array(2000).fill(0).map((item, index) => 'Item ' + index);

const SimpleFilter = React.createClass({ // eslint-disable-line no-unused-vars
	getInitialState() {
		return {data: getInitialData(), filter: ''};
	},

	renderListItems() {
		return this.state.data
			.filter(d => d !== '' && d.startsWith(this.state.filter))
			.map(item => <li key={item}>{item}</li>);
	},

	handleOnChange() {
		this.setState({filter: this.refs.filterText.value});
	},

	render() {
		return <div>
			<input type="text" onChange={this.handleOnChange} ref="filterText"/>
			<ul>
				{this.renderListItems()}
			</ul>
		</div>;
	}
});

const Component = React.createClass({ // eslint-disable-line no-unused-vars
	getInitialState() {
		return {counter: 0, text: 'Data-binding is very hard to implement ^^'};
	},

	handleIncrement() {
		this.setState({counter: this.state.counter + 1});
	},

	handleDecrement() {
		this.setState({counter: this.state.counter - 1});
	},

	onInputChanged() {
		this.setState({text: this.refs.textInput.value});
	},

	render() {
		return <div className="container">
			<h1>Hello, React!</h1>
			{this.state.counter}
			<br/>
			<a className="btn btn-primary" href="#" role="button" onClick={this.handleIncrement}>Increment</a>
			<a className="btn btn-danger" href="#" role="button" onClick={this.handleDecrement}>Decrement</a>
			<br/>
			<br/>
			<h1>{this.state.text}</h1>
			<input className="form-control" onChange={this.onInputChanged} value={this.state.text} ref="textInput"/>
			<SimpleComponentWithoutLogic name="René Viering"/>
			<SimpleFilter/>
		</div>;
	}
});

ReactDOM.render(<Component/>, document.getElementById('content'));
