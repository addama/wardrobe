import React from 'react';
import UIkit from 'uikit';
import {render} from 'react-dom';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<section>
				<h1>Home page</h1>
				<Link to='/top'>Tops</Link>
				<Link to='/bottom'>Bottoms</Link>
			</section>
		);
	}
}

export default Home;