// ICONS
// https://thenounproject.com/smashicons/collection/smashicons-man-footwear-outline/
// https://thenounproject.com/smashicons/collection/smashicons-man-accessories-outline/
// https://thenounproject.com/smashicons/collection/smashicons-men-clothes-outline/
// https://thenounproject.com/smashicons/collection/smashicons-the-essentials-outline/
// https://thenounproject.com/smashicons/collection/smashicons-woman-accessories-outline/
// https://thenounproject.com/smashicons/collection/smashicons-weather-outline/
// https://thenounproject.com/smashicons/collection/smashicons-households-2-outline/
// https://thenounproject.com/ratch0013/collection/jewelry/
// https://thenounproject.com/luke.locad/collection/mens-clothing-outline/

import UIkit from 'uikit';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ItemAdd from './components/ItemAdd';
import ItemView from './components/ItemView';

const supportsHistory = 'pushState' in window.history;

class App extends React.Component {
	render() {
		return (<BrowserRouter basename='/dist' forceRefresh={!supportsHistory}>
			<Route render={({ location}) => (
				<Switch location={location} key={location.key}>
					<Route exact path='/' component={Home} />
					<Route exact path='/top' component={Gallery} />
					<Route exact path='/bottom' component={Gallery} />
					<Route exact path='/item' component={ItemAdd} />	
					<Route path='/item/:id' component={ItemView} />	
					<Redirect to='/' />
				</Switch>
			)} />
		</BrowserRouter>);
	}
}

render(<App />, document.getElementById('root'));