import React, { Component } from 'react';

import Row from './Row';
class TableOP extends Component {
	constructor(props){
		super(props)
		this.ops = this.props.ops;
	}
	appendNumber(event){
		this.props.addValue(event.target.value);
	}
	appendRows(){
		return this.ops.map((op) => <Row key={op} r={op}/>)
	}
	render() {
		return ( 
			<table className="table table-bordered"><thead><tr><th className="text-center">OP</th></tr></thead><tbody>{this.appendRows()}</tbody></table>
		);
	}
}

export default TableOP;