import React from 'react';
import UIkit from 'uikit';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {
	render() {
		let type = this.props.match.path;
		console.log(type);
		return (
			<section>
				<h1>Gallery page: {type}</h1>
				<Link to={{ pathname: '/item/hello' }}>Item</Link>
			</section>
		);
	}
}

export default Gallery;