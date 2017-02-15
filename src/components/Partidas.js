import React, { Component } from 'react';

class Partidas extends Component{
	constructor(props){	
		super(props);
		this.partidas = this.props.partidas[0];
	}

	addRelation(v){
		this.props.addRelation(v);
	}

	addPartidas(){
		var partidas_rows =  [];
		for ( var i in this.partidas ) {
			partidas_rows.push(<tr key={i}><td colSpan="2">{i} { (this.partidas[i].length>0) ? '' : '- No existe'  }</td></tr>)
			var tmp_ = this.partidas[i].map( 
				(p,j) => <tr onClick={() => this.addRelation(p.iddetalle)} key={p.iddetalle} style={ p.style  } ><td>{p.index}</td><td>{p.descripcion}<i className={(p.className)?p.className:''}></i></td></tr>
			)

			partidas_rows.push(tmp_);
		}
		//this.setState({ _rows : partidas_rows});
		return partidas_rows;
		//return this.props.partidas.maps( (p) => <Partida iddetalle={p.iddetalle}  descripcion={p.descripcion} /> );		
	}

	render(){
		return (
			<div className="row">
			<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.addPartidas()}</tbody></table>
		</div>);
	}
}

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.state._rows}</tbody></table>

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.props.partidas}</tbody></table>

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.state._rows}</tbody></table>

export default Partidas;