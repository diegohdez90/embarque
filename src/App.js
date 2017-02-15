import React, { Component } from 'react';
import update from 'react-addons-update';
import _ from 'lodash';


import Input from './components/Input';
import Calculate from  './components/Calculate';
import TableOP from './components/TableOP';
import Select from './components/Select';
import Partidas from './components/Partidas';
import Review from './components/Review';
import Button from './components/Button'


class App extends Component {


	constructor(){
		super();
		this.state = {
			cajas : '',
			op :null,
			ops : null,
			partidas : [],
			rows : null,
			partidas_x_cajas : false,
			review : [],
			guia : null,
			cadena : null
		}
		this.w = '';
		this.guia = {};
	}

	addPartidas(v){
		this.w='choose';
		this.setState((prevState) => { partidas : prevState.partidas.push(v); });
		this.setState({caja : 1})
	}

	addRelation(v){
		//this.state.partidas_x_cajas[this.state.caja].push(v);
		var tmp_partidas = this.state.partidas;
		for(var i in this.state.partidas[0]){
			for (var j in this.state.partidas[0][i]) {
				if(this.state.partidas[0][i][j].iddetalle===v){
					if (isNaN(this.state.partidas[0][i][j].caja) ) {
						tmp_partidas[0][i][j].caja = this.state.caja;
						tmp_partidas[0][i][j].className = 'fa fa-check';
					}else{
						tmp_partidas[0][i][j].caja = NaN;
						tmp_partidas[0][i][j].className = null;
					}
				}
			}
	
		}
		this.setState((prevState) => { partidas :  tmp_partidas});
		console.log(this.state)
	}

	saveGuia(d){
		this.w = 'imprimir';
		this.setState({guia: d.RetornoSolicitud.guiaNo});
		this.setState({cadena: d.RetornoSolicitud.cadenaImpresion});

	}


	getNoGuia(){
		var data = new FormData();

		var self = this;
		data.append( "partidas", JSON.stringify( this.state.review ) );
		return  fetch('http://148.244.226.36/pruebas_sisnet02_internal_old/ventas/pedidos/acciones_evento/documentacion_pe.php', {
			method: 'POST',
			body: data
		})
		.then( (responseText) => 
			responseText.json()
		)
		.then( (response) => {
				console.log(response)
				//self.setState({guia:reponse});
				self.saveGuia(response);
				return response;
			}
		)
	}

	printZpl() {
		var printWindow = window.open();
		printWindow.document.open('text/plain')
		printWindow.document.write(this.state.cadena);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
		printWindow.close();
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
						if(this.state.cajas!=='0'&&this.state.cajas!==''){
							this.w = 'op';
							this.setState({op:''});
							this.setState({ops:[]});
						}else{
							alert('No proporcionaste numero de cajas');
						}
					break;
					case 'op':
						const op_arr = this.state.ops;
						if(this.state.op!=='0'&&this.state.op!==''){
							if(this.state.ops.indexOf(this.state.op)<0){
								op_arr.push(this.state.op)
								this.setState((prev) => ({ ops : op_arr }));
								this.setState({op:''});
							}else{
								alert('OP Duplicada');
							}
						}
						else{
							alert('No proporcionaste OP');
						}
	
					break;
				}
			break;

			case 'Procesar':
				switch(this.w){
					default:
						if(this.state.cajas!=='0'&&this.state.cajas!==''){
							this.w = 'op';
							this.setState({op:''});
							this.setState({ops:[]});
						}
						else{
							alert('No proporcionaste numero de cajas')
						}
					break;
					case 'op':
						if (this.state.ops.length >0 ) {
							this.w = 'getPartidas';
							this.setState({'partidas_x_cajas' : true});
						}else{
							alert('No proporcionaste OP')
						}
					break;
					case 'choose':
						var tmp_partidas = this.state.partidas;
						var partidas_ = [];

						for(var i in this.state.partidas[0]){
							for (var j in this.state.partidas[0][i]) {
								tmp_partidas[0][i][j].style = {};
								tmp_partidas[0][i][j].op = i;
								
							}
							partidas_ = update(partidas_, {$push : tmp_partidas[0][i]});
						}
						this.setState({partidas : tmp_partidas});
						this.setState({review : _.sortBy(partidas_,function(o) { return o.caja })});
						this.w = 'review';
					break;

				}
			break;

			case 'Siguiente':
				var tmp_partidas = this.state.partidas;
				for(var i in this.state.partidas[0]){
					for (var j in this.state.partidas[0][i]) {
						if(!isNaN(this.state.partidas[0][i][j].caja) ){
							this.state.partidas[0][i][j].style =  { display : 'none' };
						}
					}
			
				}
				this.setState((prevState) => ({ caja : prevState.caja+1}));

			break;
			case 'Generar Guia':
				var g = this.getNoGuia();
			break;
			case 'Imprimir Ficha':
				this.printZpl();
			break;
			case 'Cerrar Embarque':
				this.w = '';
				this.setState({
					cajas : '',
					op :null,
					ops : null,
					partidas : [],
					partidas_x_cajas : false,
					review : [],
					guia : null,
					caja : null,
					cadena : null
				});

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
					width: '100%',
					float : "right"
				}
				return( 	
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">Proporciona folio OP</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6">
								<div className="row">
									<div className="col-md-4">
									</div>
									<div className="col-md-4">
									</div>
									<div className="col-md-4">
										<Input className="op" style={inputStyle} value={this.state.op} readOnly/>
									</div>
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
							<div className="col-xs-6 col-sm-6 col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
					);
			break;
			case 'getPartidas':
				var on_load = null;
				if(this.state.partidas !==  null){
					on_load = <h2 className="text-center">Partidas Cargadas (Click en Procesar)</h2>;
				}else{
					on_load = <h2 className="text-center">Obteniendo Productos</h2>;
				}
				return(
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								{on_load}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6">
								<div className="row">
									<div className="col-md-6">
									</div>
									<div className="col-md-6">
										<Select addPartidas={this.addPartidas.bind(this)} ops={this.state.ops}  appendValue={this.appendValue.bind(this)}/>
									</div>
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6"><Calculate label="Procesar" appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
				);
			break;
			case 'choose':
			var cal = null;
				if(this.state.caja < parseInt(this.state.cajas)){
					cal = <Calculate label="Siguiente" appendValue={this.appendValue.bind(this)}  />
				}else{
					cal = <Calculate label="Procesar" appendValue={this.appendValue.bind(this)}  />
				}
				return(
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">Selecciona las partidas para la caja {this.state.caja}</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12">
										<Partidas partidas={this.state.partidas} addRelation={this.addRelation.bind(this)}/>
									</div>
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6">{cal}</div>
						</div>
					</div>
				);
			break;
			case 'review':
				let h = ''
				var label = '';
				if(this.state.guia){
					h = 'Guia Generada Click en Procesar';
					label = 'Procesar'
				}else{
					h = 'Revisa las partidas para esta guia';
					label = 'Generar Guia'
				}
				return(
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">{h}</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-md-3">
							</div>
							<div className="col-md-6">
								<Review partidas={this.state.review}/>
							</div>
							<div className="col-md-3">
							</div>
						</div>
						<div className="row text-center">
							<Button addValue={this.appendValue.bind(this)} value={label}/>
						</div>
					</div>
				);
			break;
			case 'imprimir':

				return(
					<div className="container">
						<div className="row">
							<h2 className="text-center">El proceso de ordenes de producción ha finalizado correctamente</h2>
						</div>
						<div className="row text-center">
							<h2>{this.state.guia}</h2>
						</div>
						<div className="row text-center">
							<a className="btn btn-info" target="_blank" href={'http://webbooking-pruebas.paquetexpress.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen='+this.state.guia}>Imprimir PDF</a>
							<Button addValue={this.appendValue.bind(this)} value="Imprimir Ficha"/>
							<Button addValue={this.appendValue.bind(this)} value="Cerrar Embarque"/>
						</div>

					</div>
				);
			break;
			default:
				inputStyle= {
					width : "35%",
					float : "right",
					fontSize: "92px"
				}
				console.log(this.state);
				return (
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">¿Cuantas cajas vas a usar en esta guia?</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6">
								<Input style={inputStyle} value={this.state.cajas}/>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
				);
			break;
		}
	}
}

export default App;
