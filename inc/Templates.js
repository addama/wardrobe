var Templates = {
	pages: {
		login: function() {
			return m('section', {
				id: Data.containerID + 'login',
				className: 'uk-flex uk-flex-around'
			}, [
				m('section', {
					id: 'loginPanel',
					className: 'uk-padding-large bordered dropshadow uk-flex uk-flex-between'
				}, [
					Templates.elements.input({
						label: 'username',
						name: 'username',
						isUnique: true,
						value: 'addama',
						onSubmit: Wardrobe.user.checkLogin
					}),
					Templates.elements.input({
						label: 'password',
						type: 'password',
						name: 'password',
						isUnique: true,
						value: 'adonai',
						onSubmit: Wardrobe.user.checkLogin
					})
				])
			]);
		},
		
		home: function() {
			return m('div', {
				id: Data.containerID + 'home',
				className: 'uk-flex uk-flex-around uk-flex-stretch uk-height-1-1 uk-container-large uk-align-center fullheight'
			}, [
				/* Templates.elements.button({
					label: 'Add new Item',
					name: 'addNewItem',
					isUnique: true,
					onClick: function() { Router.navigate('#/item'); }
				}),
				Templates.elements.button({
					label: 'Add new Outfit',
					name: 'addNewOutfit',
					isUnique: true,
					onClick: function() { Router.navigate('#/outfit'); }
				}), */
				m('ul', {
					'uk-switcher':'', 
					className: 'uk-tab uk-flex-center uk-tab-left uk-width-auto'
				}, [
					Templates.components.tabs(),
					m('li', [ m('a', 'outfits') ]),
				]),
				m('ul', {
					className: 'uk-switcher uk-margin uk-padding-small uk-width-expand'
				}, [
					m('li', 'HELLO1'),
					m('li', 'HELLO2'),
					m('li', 'HELLO3'),
					m('li', 'HELLO4'),
					m('li', 'HELLO5'),
					m('li', 'HELLO6'),
					m('li', 'HELLO7'),
				])
			]);
		},
		
		itemAdd: function() {
			return m('div','ItemAdd');
		},
		
		itemView: function() {
			return m('div','ItemView');
		},
		
		outfitAdd: function() {
			return m('div','OutfitAdd');
		},
		
		outfitView: function() {
			return m('div','OutfitView');
		},
	},
	
	components: {
		menu: function() {
			return m('header', {
				
			}, [
				m('nav', {
					
				}, [
					m('ul', {
						
					}, [
						m('li', 'Back'),
					])
				])
			]);
		},
		
		tabs: function() {
			var tabs = [];
			for (var i = 0, l = Data.groups.length; i < l; i++) {
				tabs.push(m('li', [m('a', Data.groups[i])]));
			}
			return tabs;
		},
	},
	
	elements: {
		input: function(params) {
			// params := label, type, value, name, isUnique, isRequired, onSubmit
			if (!params.label) params.label = params.type || Data.defaultLabelText;
			if (!params.type || Data.inputTypes.indexOf(params.type) === -1) params.type = Data.defaultInputType;
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : '');
			var props = {
				id: id,
				name: params.name,
				type: params.type,
			}
			if (params.value) props.value = params.value;
			if (params.isRequired) props.required = 'required';
			if (params.onSubmit && params.onSubmit instanceof Function) props.onkeyup = function(event) {
				if (event.key === 'Enter') params.onSubmit(event);
			}
			return m('div', {
				// Container div
				id: Data.containerID + id,
				className: 'uk-flex uk-flex-around uk-flex-column uk-padding-small',
			}, [
				m('label', {
					id: Data.labelID + id,
					'for': id
				}, params.label),
				m('input', props)
			]);
		},
		
		button: function(params) {
			// params := label(/value), type, name, isUnique, onClick, addClass
			if (!params.label) params.label = params.value || Data.defaultButtonText;
			if (!params.type || Data.inputTypes.indexOf(params.type) === -1) params.type = Data.defaultButtonType;
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.buttonID + params.name + ((!params.isUnique) ? random : '');
			var props = {
				id: id,
				name: params.name,
			}
			if (params.onClick && params.onClick instanceof Function) props.onclick = params.onClick;
			return m('button', props, params.label);
		},
		
		colors: function(values) {
			return m('div', {
				id: Data.containerID + Data.colorID,
			}, [
				// Primary color
				m('input', {
					id: Data.buttonID + Data.colorID + 'primary',
					name: Data.colorID + 'primary',
					type: 'color',
					value: values[0] || Data.defaultColor,
				}),
				// Secondary color
				m('input', {
					id: Data.buttonID + Data.colorID + 'secondary',
					name: Data.colorID + 'secondary',
					type: 'color',
					value: values[1] || Data.defaultColor,
				}),
				// Accent color
				m('input', {
					id: Data.buttonID + Data.colorID + 'accent',
					name: Data.colorID + 'accent',
					type: 'color',
					value: values[2] || Data.defaultColor,
				}),
			]);
		},
	
	},
	
	icons: {
		danger: function() {
			return m('i.fas.fa-exclamation-triangle');
		},
		
		info: function() {
			return m('i.fas.fa-info-circle');
		},
		
		success: function() {
			return m('i.fas.fa-check-square');
		},
	}
}