var Templates = {
	pages: {
		login: function() {
			return m('Login');
		},
		
		home: function() {
			return m('Home');
		},
		
		itemAdd: function() {
			return m('Item');
		},
		
		itemView: function() {
			return m('Item');
		},
		
		outfitAdd: function() {
			
		},
		
		outfitView: function() {
			
		},
	},
	
	components: {
		input: function(params) {
			// params := label, type, value, name, isUnique
			if (!params.label) params.label = params.type || Data.defaultLabelText;
			if (!params.type || Data.inputTypes.indexOf(params.type) === -1) params.type = Data.defaultInputType;
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : null);
			var props = {
				id: id,
				name: params.name,
				type: params.type,
			}
			if (params.value) props.value = params.value;
			return m('div', {
				// Container div
				id: Data.containerID + id,
				className: '',
			}, [
				m('label', {
					id: Data.labelID + id,
					'for': id
				}, params.label),
				m('input', props)
			]);
		},
		
		button: function(params) {
			// params := label(/value), type, name, isUnique, handler
			if (!params.label) params.label = params.value || Data.defaultButtonText;
			if (!params.type || Data.inputTypes.indexOf(params.type) === -1) params.type = Data.defaultButtonType;
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.buttonID + params.name + ((!params.isUnique) ? random : null);
			var props = {
				id: id,
				name: params.name,
			}
			if (params.handler && params.handler instanceof Function) props.onclick = function(event) {
				handler(event);
			}
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
}