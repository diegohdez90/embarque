import React, { Component } from 'react';

import Input from './components/Input';
import Calculate from  './components/Calculate';
import TableOP from './components/TableOP';
import Select from './components/Select';
class App extends Component {
	constructor(){
		super();
		this.state = {
			cajas : '0',
			op : '',
			ops : []
		}
		this.w = ''
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
				switch(this.w){
					default:
						const c = this.state.cajas.substring(0,this.state.cajas.length-1);
						this.setState({cajas:c});
					break;
					case 'op':
						const o = this.state.op.substring(0,this.state.op.length-1);
						this.setState({op:o});
					break;
				}

			break;

			case 'E':
				switch(this.w){
					default:
						this.w = 'op';
						this.setState({op:'0'});
					break;
					case 'op':
						const op_arr = this.state.ops;
						op_arr.push(this.state.op)
						this.setState((prev) => ({ ops : op_arr }));
						this.setState({op:'0'});
					break;
				}
			break;

			case 'Procesar':
				switch(this.w){
					default:
						if(this.state.cajas!=="0"){
							this.w = 'op';
							this.setState({op:'0'});
						}
						else{
							alert('No proporcionaste numero de cajas')
						}
					break;
					case 'op':
						if (this.state.ops.length >0 ) {
							this.w = 'choose';
							var op_x_c =  {};
							for (var i = 0; i < this.state.cajas; i++) {
								var j = i+1;
								op_x_c[j] = [];
							}
							this.setState({'op_x_cajas' : op_x_c, 'caja' : 1});
						}else{
							alert('No proporcionaste OP')
						}

				}
			break;

			case 'Siguiente':

				this.setState((prevState) => ({ caja : prevState.caja+1}));

			break;
			default:
				switch(this.w){
					default:
						if(this.state.cajas.length>1){
							const c = this.state.cajas.substring(1)+v;
							this.setState({cajas:c});
						}else{
							this.setState({cajas:this.state.cajas+v});
						}
					break;
					case 'op':
						this.setState({op:this.state.op+v});
					break;
				}

		}

	}
	render() {
		var inputStyle = {};
		switch(this.w){
			case 'op':
				inputStyle= {
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
									<Input style={inputStyle} value={this.state.op} readOnly/>
								</div>
								<div className="row">
									<div className="col-md-4">
									</div>
									<div className="col-md-4">
									</div>
									<div className="col-md-4">
										<TableOP ops={this.state.ops}/>
									</div>
								</div>
							</div>
							<div className="col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
					);
			break;
			case 'choose':
				return(
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">Selecciona las OP para la caja {this.state.caja}</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="row">
									<div className="col-md-6">
									</div>
									<div className="col-md-6">
										<Select addOPTo={this.addOPTo.bind(this)} ops={this.state.ops} caja={this.state.caja} chosen={this.state.op_x_cajas}/>
									</div>
								</div>
							</div>
							<div className="col-md-6"><Calculate label="Siguiente" appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
				);
			break;
			default:
				inputStyle= {
					width : "25%",
					float : "right",
					fontSize: "92px"
				}

				return (
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">¿Cuantas cajas vas a usar en esta guia?</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<Input style={inputStyle} value={this.state.cajas}/>
							</div>
							<div className="col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
				);
			break;
		}
	}
}

export default App;
