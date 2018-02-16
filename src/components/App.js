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

// https://sass-lang.com/documentation/file.SASS_REFERENCE.html

import UIkit from 'uikit';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Gallery from './Gallery';
import ItemAdd from './ItemAdd';
import ItemView from './ItemView';
import { createStore, combineReducers } from 'redux';
	
const supportsHistory = 'pushState' in window.history;
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			json: '',
			isLoading: false
		}
	}
	
	componentDidMount() {

	}
	
	render() {
		const { json, isLoading } = this.state;
		return (
		<BrowserRouter basename='/dist' forceRefresh={!supportsHistory}>
			<Route render={({ location}) => (
				<Switch location={location} key={location.key}>
					<Route exact path='/' component={Home} />
					<Route exact path='/top' component={Gallery} />
					<Route exact path='/bottom' component={Gallery} />
					<Route exact path='/over' component={Gallery} />
					<Route exact path='/under' component={Gallery} />
					<Route exact path='/around' component={Gallery} />
					<Route exact path='/shoe' component={Gallery} />
					<Route exact path='/hat' component={Gallery} />
					<Route exact path='/item' component={ItemAdd} />	
					<Route path='/item/:id' component={ItemView} />	
					<Redirect to='/' />
				</Switch>
			)} />
		</BrowserRouter>
		);
	}
}

export default App;