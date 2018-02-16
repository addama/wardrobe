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
import Home from './components/Home';
import App from './components/App';
import Gallery from './components/Gallery';
import ItemAdd from './components/ItemAdd';
import ItemView from './components/ItemView';
import { createStore, combineReducers } from 'redux';

const ajax = (url, data, method, goodHandler, badHandler) => {
	// A simple AJAX function 
	var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	if (!method) method = 'GET';
	if (method === 'POST') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	}
	
	if (data instanceof Object) {
		var query = [];
		for (var key in data) {
			query[query.length] = encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}
		data = query.join('&');
	}
	
	xhr.open(method, url + '?' + data, true);
	if (badHandler) xhr.onerror = badHandler;
	xhr.onload = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			if (goodHandler) {
				goodHandler(xhr.responseText);
			} else {
				return xhr.responseText;
			}
		}	
	}

	xhr.send(null);
	return xhr;
}

render(<App />, document.getElementById('root'));