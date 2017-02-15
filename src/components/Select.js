import React, { Component } from 'react';
import axios from 'axios';
import Cell from './Cell';

class Select extends Component {
	constructor(props){
		super(props)
		this.rows = null;
		this.state = {
			partidas : [],
			rows : []
		}
		this.Rows();
	}

	sendPartidas(p){
		this.props.addPartidas(p);
	}

	Rows(){

		var ops = this.props.ops;
		var op_length = ops.length;
		var op_cont = 0;
		var productos = [];

		var partidas = {};
		for (var i = 0; i < this.props.ops.length; i++) {
			partidas[this.props.ops[i]] = []
			axios.get(`http://148.244.226.38/sibei_gabin/system/__restop__.php?id=${this.props.ops[i]}`)
			.then( (response) =>{
				if(response.data.partidas!==-1){
					productos.push([<tr key={response.data.op}><td colSpan="2">{response.data.op}</td></tr>]);
					response.data.partidas.map( (p,j) => partidas[response.data.op][j] = { iddetalle : p.iddetalle, descripcion : p.descripcion, index : j+1, caja: NaN, style : { display : '' , cursor : 'pointer'}, className : '' } );
					this.setState({rows : partidas});
					var tmp_p = response.data.partidas.map( (p,j) => <tr key={p.iddetalle} style={ p.style  } ><Cell v={j+1}/><Cell v={p.descripcion}/></tr>)
					productos.push(tmp_p);
				}else{
					productos.push([<tr key={response.data.op}><td colSpan="2">{response.data.op} No existe</td></tr>]);
				}
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
	}


	render() {
		return ( 
			<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.state.partidas}</tbody></table>
		);
	}
}

export default Select;