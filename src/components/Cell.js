import React, { Component } from 'react';


class Cell extends Component {

	render() {
			return ( 
				<td>{this.props.v}</td>
			);

	}
}

export default Cell;