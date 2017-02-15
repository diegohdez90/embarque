import React, { Component } from 'react';
var _ = require('lodash');

class Review extends Component{
	constructor(props){	
		super(props);
		this.partidas = this.props.partidas;
	}

	addPartidas(){
		//var partidas_rows =  [];
		//var tmp_ = []
		//for ( var i in this.partidas ) {
			//partidas_rows.push(<tr key={i}><td colSpan="3">{i} { (this.partidas[i]!==undefined) ? '' : '- No existe'  }</td></tr>)
			return this.partidas.map( 
				(p,j) => <tr onClick={() => this.addRelation(p.iddetalle)} key={p.iddetalle} style={ p.style  } ><td>{p.op}</td><td>{p.descripcion}</td><td>{p.caja}</td></tr>
			)
		//}
		//return partidas_rows;
		//return _.sortBy(partidas_rows, [function(o) { return o.caja }]);
	}

	render(){
		return (
			<div className="row">
			<table className="table table-bordered"><thead><tr><th>OP</th><th className="text-center">Productos</th><th>Caja</th></tr></thead><tbody>{this.addPartidas()}</tbody></table>
		</div>);
	}
}

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.state._rows}</tbody></table>

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.props.partidas}</tbody></table>

//<table className="table table-bordered"><thead><tr><th className="text-center" colSpan="2">Productos</th></tr></thead><tbody>{this.state._rows}</tbody></table>

export default Review;