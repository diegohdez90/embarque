import React, { Component } from 'react';
import Button from './Button';

class Input extends Component {

	addValue(v){
		this.props.appendValue(v);
	}
	render() {
		var label;
		if(this.props.label){
			label = this.props.label;
		}else{
			label = "Procesar";
		}
		return (
			<div>
				<div className="row">
					{[1,2,3].map( (number) => <Button key={number} addValue={this.addValue.bind(this)} value={number}/> )}
				</div>
				<div className="row">
					{[4,5,6].map( (number) => <Button key={number} addValue={this.addValue.bind(this)} value={number}/> )}
				</div>
				<div className="row">
					{[7,8,9].map( (number) => <Button key={number} addValue={this.addValue.bind(this)} value={number}/> )}
				</div>
				<div className="row">
					<Button addValue={this.addValue.bind(this)} value="<"/>
					<Button addValue={this.addValue.bind(this)} value={0}/>
					<Button addValue={this.addValue.bind(this)} value="E"/>
				</div>
				<div className="row">
					<Button addValue={this.addValue.bind(this)} value={label}/>
				</div>
			</div>
		);
	}
}

export default Input;