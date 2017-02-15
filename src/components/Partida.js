import React, { Component } from 'react';

class Partida extends Component{


	render(){
		return (
			<tr><td>{this.props.index}</td><td>{this.props.descripcion}</td></tr>
		);
	}
}

export default Partida;