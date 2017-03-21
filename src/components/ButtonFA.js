import React, { Component } from 'react';

class ButtonFA extends Component {

	appendNumber(event){
		this.props.addValue(event.target.value);
	}
	render() {
		return ( 
			<button className="btn btn-primary" onClick={this.appendNumber.bind(this)} value={this.props.value}><i className={this.props.fa}></i></button>
		);
	}
}

export default ButtonFA;
