import React from 'react';
import UIkit from 'uikit';
import {render} from 'react-dom';

class ItemView extends React.Component {
	render() {
		let id = this.props.match.params.id;
		console.log('view', this.props);
		return (
			<h1>Item view page: {id}</h1>
		);
	}
}

export default ItemView;