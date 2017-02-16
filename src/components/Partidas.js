import React, { Component } from 'react';

class Partidas extends Component{
	constructor(props){	
		super(props);
		this.partidas = this.props.partidas;
	}

	addRelation(v){
		this.props.addRelation(v);
	}

	addPartidas(){
		var partidas_rows =  [];
		for ( var i in this.partidas ) {
			if(this.partidas[i]!==undefined){
				partidas_rows.push(<tr key={i}><td colSpan="2">{i} { (this.partidas[i].length>0) ? '' : '- No existe'  }</td></tr>)
				var tmp_ = this.partidas[i].map( 
					(p,j) => <tr onClick={() => this.addRelation(p.iddetalle)} key={p.iddetalle} style={ p.style  } ><td>{p.index}</td><td>{p.descripcion}<i className={(p.className)?p.className:''}></i></td></tr>
				)
				partidas_rows.push(tmp_);
			}
		}
		return partidas_rows;
	}

	render(){
		return (
			<div className="row">
			<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.addPartidas()}</tbody></table>
		</div>);
	}
}



export default Partidas;
