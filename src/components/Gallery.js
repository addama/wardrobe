import React from 'react';
import UIkit from 'uikit';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {
	render() {
		console.log('hello', this.props);
		let type = this.props.match.path;
		return (
			<section>
				<h1>Gallery page</h1>
				<Link to={{ pathname: '/item/hello' }}>Item</Link>
			</section>
		);
	}
}

export default Gallery;