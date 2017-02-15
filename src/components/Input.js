import React, { Component } from 'react';

class Input extends Component {

	render() {
		return (
			<input className={this.props.className} type="text" style={this.props.style} value={this.props.value} />
		);
	}
}

export default Input;