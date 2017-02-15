import React, { Component } from 'react';
//import { EventEmitter } from "events";
import Cell from './Cell';

class Row extends Component {
	constructor(){
		super();
		this.state = {
			iddocumento : null,
			partidas : []
		}
		this.partidas = null;
		this.p = null;
	}

	handleClickRow(v){
		this.props.addOP(v);
	}


	render() {
			return ( 
				<tr><Cell v={this.props.r}/></tr>
			);

	}
}

export default Row;