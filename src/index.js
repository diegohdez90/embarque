import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Cajas from './components/Cajas';
//import ProporcionarOP from './components/ProporcionarOP';

//import { Route, Router, Link, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
 <div className="container"><App/></div>
 ,
  document.getElementById('app')
);

/*



	<Router history = {browserHistory} >
		<Route path="/" component = {App}>
			<IndexRoute component = {Cajas} />
			<Route path = "ops" component = {ProporcionarOP} />
		</Route>
	</Router>
<Route path = "home" component = {Home} />
			<Route path = "about" component = {About} />
			<Route path = "contact" component = {Contact} /

*/