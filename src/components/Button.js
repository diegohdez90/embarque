import React, { Component } from 'react';

class Button extends Component {

	appendNumber(event){
		this.props.addValue(event.target.value);
	}
	render() {
		return ( 
			<button className="btn btn-primary" onClick={this.appendNumber.bind(this)} value={this.props.value}>{this.props.value}</button>
		);
	}
}

export default Button;