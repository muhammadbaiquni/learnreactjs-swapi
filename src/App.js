import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import People from './pages/People/People';
import Navigation from './components/Navigation/Navigation';
import './App.css';

const App = () => (
	<div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
	<Router>
		<React.Fragment>
			<Navigation />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/people/:peopleId" component={People} exact />
			</Switch>
		</React.Fragment>
	</Router>
	</div>
);


export default App;
