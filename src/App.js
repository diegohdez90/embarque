import React, { Component } from 'react';
import update from 'react-addons-update';
import _ from 'lodash';
import axios from 'axios';

import Input from './components/Input';
import Calculate from  './components/Calculate';
import TableOP from './components/TableOP';
import Select from './components/Select';
import Partidas from './components/Partidas';
import Review from './components/Review';
import Button from './components/Button'
import ButtonFA from './components/ButtonFA';



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
			cadena : null,
			all : null
		}
		this.w = '';
		this.guia = {};

	}

	addPartidas(v){
		this.w='choose';
		this.setState({ partidas : v, caja : 1 });
	}

	addRelation(v){
		var tmp_partidas = this.state.partidas;
		for(var i in this.state.partidas){
			if(this.state.partidas[i]!==undefined){
				for (var j in this.state.partidas[i]) {
					if(this.state.partidas[i][j].iddetalle===v){
						if (isNaN(this.state.partidas[i][j].caja) ) {
							tmp_partidas[i][j].caja = this.state.caja;
							tmp_partidas[i][j].className = 'fa fa-check';
						}else{
							tmp_partidas[i][j].caja = NaN;
							tmp_partidas[i][j].className = null;
						}
					}
				}
			}
	
		}
		this.setState({ partidas :  tmp_partidas})
	}




	selectAll(){

		var tmp_partidas = this.state.partidas;
		for(var i in this.state.partidas){
			if(this.state.partidas[i]!==undefined){
				for (var j in this.state.partidas[i]) {
					if(this.state.partidas[i][j].style.display==='' && isNaN(this.state.partidas[i][j].caja)){
						tmp_partidas[i][j].caja = this.state.caja;
						tmp_partidas[i][j].className = 'fa fa-check';
					}
				}
			}
	
		}
		this.setState({ partidas :  tmp_partidas})

	}


	deselectAll(){
		var tmp_partidas = this.state.partidas;
		for(var i in this.state.partidas){
			if(this.state.partidas[i]!==undefined){
				for (var j in this.state.partidas[i]) {
					if(this.state.partidas[i][j].style.display==='' && !isNaN(this.state.partidas[i][j].caja)){
						tmp_partidas[i][j].caja = NaN;
						tmp_partidas[i][j].className = null;
					}
				}
			}
	
		}
		this.setState({ partidas :  tmp_partidas})


	}

	setImprimir(d){
		this.w="imprimir";
		this.setState({guia: d.RetornoSolicitud.guiaNo});
	}

	saveGuia(d){

		var self = this;
		let solicitud = d;
		var data = new FormData();
		data.append('auth',1);
		data.append('zpl',d.RetornoSolicitud.cadenaImpresion);
		axios.post('http://localhost:3000/setCadena',
			{
				params :{
					zpl : d.RetornoSolicitud.cadenaImpresion
				}
			}
		)
		.then(function (response) {
			console.log(response);
			self.setImprimir(solicitud)
		}).
		catch(function (err) {
			console.log(err);
		})
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
				self.saveGuia(response);
				return response;
			}
		)
	}

	printZpl() {
		axios.get('http://localhost:3000/imprimirZpl')
		.then(function (response) {
			console.log(response);
		}).
		catch(function (err) {
			console.log(err);
		})
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
							this.setState({'partidas_x_cajas' : true, 'all' : false});
						}else{
							alert('No proporcionaste OP')
						}
					break;
					case 'choose':
						var tmp_partidas = this.state.partidas;
						var partidas_ = [];
						var sliceNACaja = [];
						for(var i in this.state.partidas){
							if(this.state.partidas[i]!==undefined){
								for (var j in this.state.partidas[i]) {
									if(this.state.partidas[i][j]!==undefined){
										tmp_partidas[i][j].style = {};
										tmp_partidas[i][j].op = i;
									}
									
								}
								sliceNACaja = tmp_partidas[i];
								_.remove(sliceNACaja, function(ii){
									return isNaN(ii.caja);
								})
								partidas_ = update(partidas_, {$push : tmp_partidas[i]});
							}
						}
						this.setState({partidas : tmp_partidas});
						this.setState({review : _.sortBy(partidas_,function(o) { return o.caja })});
						this.w = 'review';
					break;

				}
			break;

			case 'Siguiente':
				var tmp_partidas_ = this.state.partidas;
				for(var r in this.state.partidas){
					if(this.state.partidas[r]!==undefined){
						for (var p in this.state.partidas[r]) {
							if(!isNaN(this.state.partidas[r][p].caja) ){
								tmp_partidas_[r][p].style =  { display : 'none' };
							}
						}
					}
			
				}
				this.setState({partidas : tmp_partidas_})
				this.setState({all:false})
				this.setState((prevState) => ({ caja : prevState.caja+1}));

			break;
			case 'Generar Guia':
				this.getNoGuia();
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
			case 'all':
				if(this.state.all){
					this.deselectAll();
					this.setState({all:false});
				}else{
					this.selectAll();
					this.setState({all:true});
				}
			break;
			default:
				switch(this.w){
					case '':
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
		var tableStyle= {};
		switch(this.w){
			case 'op':
				inputStyle= {
					width: '100%',
					float : "right"
				};
				tableStyle= {
					height : '250px',
					'overflowY' : 'scroll',
					'overflowX' : 'hidden'
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
									<div className="col-md-4" style={tableStyle}>
										<TableOP ops={this.state.ops}/>
									</div>
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
					);
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
			case 'choose':
				var cal = null;
				let fa;
				tableStyle= {
					height : '250px',
					'overflowY' : 'scroll',
					'overflowX' : 'hidden'
				}
				if(!this.state.all){
					fa = 'fa fa-square-o';
				}else{
					fa = 'fa fa-check-square-o';
				}
				if(this.state.caja < parseInt(this.state.cajas,10)){
					cal = <Calculate label="Siguiente" appendValue={this.appendValue.bind(this)}  />
				}else{
					cal = <Calculate label="Procesar" appendValue={this.appendValue.bind(this)}  />
				}
				var get_partidas =  <Partidas partidas={this.state.partidas} addRelation={this.addRelation.bind(this)}/>
				return (<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="text-center">Selecciona las partidas para la caja {this.state.caja}</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 col-md-6">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12" style={tableStyle}>
										{get_partidas}
									</div>
								</div>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6">{cal}
							<ButtonFA addValue={this.appendValue.bind(this)} fa={fa} value="all" />
							</div>
						</div>
					</div>
				);
			case 'review':
				let h = ''
				var label = '';
				tableStyle= {
					height : '250px',
					'overflowY' : 'scroll',
					'overflowX' : 'hidden'
				}
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
							<div className="col-md-6" style={tableStyle}>
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
			default:
				inputStyle= {
					width : "35%",
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
							<div className="col-xs-6 col-sm-6 col-md-6">
								<Input style={inputStyle} value={this.state.cajas}/>
							</div>
							<div className="col-xs-6 col-sm-6 col-md-6"><Calculate appendValue={this.appendValue.bind(this)}  /></div>
						</div>
					</div>
				);
		}
	}
}

export default App;
