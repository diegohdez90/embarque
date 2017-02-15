'use stric';

import React, { Component } from 'react';

import Input from './Input';
import Calculate from  './Calculate';
import TableOP from './TableOP';

class ProporcionarOP extends Component {
	constructor(props){
		super(props);
	}


	addOPTo(v){
		console.log('GET '+v)
		var caja =  this.state.caja;
		var tmp_array = this.state.op_x_cajas[caja];
		tmp_array.push(v);
	}



	appendValue(v){

		switch(v){
			case '<':

				const o = this.props.op.substring(0,this.props.op.length-1);
				this.props.setState({op:o});

			break;

			case 'E':

				const op_arr = this.props.ops;
				op_arr.push(this.props.op)
				this.props.setState((prev) => ({ ops : op_arr }));
				this.props.setState({op:'0'});

			break;

			case 'Procesar':

				if (this.props.ops.length >0 ) {
					this.w = 'choose';
					var op_x_c =  {};
					for (var i = 0; i < this.props.cajas; i++) {
						var j = i+1;
						op_x_c[j] = [];
					}
					this.props.setState({'op_x_cajas' : op_x_c, 'caja' : 1});
				}else{
					alert('No proporcionaste OP')
				}

			break;

			case 'Siguiente':

				this.setState((prevState) => ({ caja : prevState.caja+1}));

			break;
			default:
				case 'op':
					this.props.setState({op:this.props.op+v});
				break;

		}

	}
	render() {

		var inputStyle= {
			width : "25%",
			float : "right",
		}
		return( 	
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2 className="text-center">Proporciona folio OP</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<Input style={inputStyle} value={this.props.op} readOnly/>
						</div>
						<div className="row">
							<div className="col-md-4">
							</div>
							<div className="col-md-4">
							</div>
							<div className="col-md-4">
								<TableOP ops={this.props.ops}/>
							</div>
						</div>
					</div>
					<div className="col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
				</div>
			</div>
			);
			
	}
}

export default ProporcionarOP;
