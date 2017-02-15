import React, { Component } from 'react';
//import { EventEmitter } from "events";
import axios from 'axios';
import Cell from './Cell';
class Rows extends Component {
	constructor(props){
		super(props);
		this.state = {
			iddocumento : null,
			partidas : []
		}
	}

	handleClickRow(v){
		this.props.addOP(v);
	}

	sendPartidas(p){
		this.props.addPartidas(p);
	}

	setRows(r){
		this.setState({partidas : r})
	}

	render() {

		var ops = this.props.ops;
		var op_length = ops.length;
		var op_cont = 0;
		var productos = [];

		var partidas = {};
		for (var i = 0; i < ops.length; i++) {

			axios.get(`http://148.244.226.38/sibei_gabin/system/__restop__.php?id=${ops[i]}`)
			.then( (response) =>{
				productos.push([<tr key={ops[i]}><td colSpan="2">{ops[i]}</td></tr>]);
				response.data.map( (p,j) => partidas[p.iddetalle] = { iddetalle : p.iddetalle, descripcion : p.descripcion, index : j+1 } );
				//partidas[ops[i]] = p_tmp;
				var tmp_p = response.data.map( (p,j) => <tr key={p.iddetalle}><Cell v={j+1}/><Cell v={p.descripcion}/></tr>)
				productos.push(tmp_p);
				op_cont++;
				if(op_cont===op_length){
					this.setState({partidas : productos});
					this.sendPartidas(partidas);
				}
			} )
			.catch( (res) => {
				console.log(res)
			} );


		}

		return ( 
			<tbody>{this.state.partidas}</tbody>
			
		);
		
	}
}

export default Rows;