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
					Templates.components.input({
						label: 'username',
						name: 'username',
						isUnique: true,
						value: 'addama',
						onSubmit: Wardrobe.user.checkLogin
					}),
					Templates.components.input({
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
				className: 'uk-flex uk-flex-around uk-flex-stretch uk-height-1-1 uk-container-large uk-align-center fullheight uk-width-1-2'
			}, [
				m('ul', {
					'uk-switcher':'', 
					className: 'uk-tab uk-flex-center uk-tab-left uk-width-auto'
				}, [
					Templates.components.tabs(),
				]),
				m('ul', {
					className: 'uk-switcher uk-margin uk-padding-small uk-width-expand'
				}, [
					Templates.components.galleries(),
					m('br'),	// Filler
					m('span', 'outfits'),
					m('br'),	// Filler
					Templates.pages.itemAdd(),
					Templates.pages.outfitAdd()
				])
			]);
		},
		
		itemAdd: function() {
			/*
				brand: false,				// 'Carhartt'
				group: group,				// 'top'
				type: true,					// 'tshirt'
				name: true,					// 'Chili Heather Carhartt Shirt'
				notes: false,				// 'Comfortable, bought at Carhartt store'
				size: {
					general: false,			// 'l'
					specific: false,			// 'tall'
					height: false,			// null
					width: false,			// null
				},
				price: false,				// '16.99'
				requiresUnder: true,			// false
				formality: false,			// 1
				warmth: false,				// 1
				color: {
					primary: true,			// 'orange'
					secondary: false,		// 'gray'
					accent: false,			// null
				},
			*/
			return m('div', {
				id: Data.containerID + 'addItem',
			}, [
				m('h1', Data.addItemLabel),
				Templates.components.input({
					label: 'Brand',
					name: 'brand',
					isUnique: true,
				}),
				Templates.components.select({
					label: 'Group',
					name: 'group',
					isUnique: true,
					blankFirstItem: true,
					onChange: function() {
						Wardrobe.changeTypeSelect(this.value);
					},
				}, Templates.components.options.basic('groups')),
				Templates.components.select({
					label: 'Material',
					name: 'material',
					isUnique: true,
					blankFirstItem: true,
				}, Templates.components.options.basic('materials')),
				Templates.components.select({
					label: 'Size',
					name: 'size',
					isUnique: true,
					blankFirstItem: true,
				}, Templates.components.options.basic('sizes')),
				Templates.components.select({
					label: 'Primary Color',
					name: 'color1',
					isUnique: true,
					blankFirstItem: true,
					onChange: function(event) {
						Wardrobe.changeColorSelect(this);
					},
				}, Templates.components.options.colors()),
				Templates.components.select({
					label: 'Secondary Color',
					name: 'color2',
					isUnique: true,
					blankFirstItem: true,
					onChange: function(event) {
						Wardrobe.changeColorSelect(this);
					},
				}, Templates.components.options.colors()),
				Templates.components.select({
					label: 'Accent Color',
					name: 'color3',
					isUnique: true,
					blankFirstItem: true,
					onChange: function(event) {
						Wardrobe.changeColorSelect(this);
					},
				}, Templates.components.options.colors()),
				Templates.components.select({
					label: 'Type',
					name: 'type',
					isUnique: true,
					blankFirstItem: true,
				}, []),
				Templates.components.input({
					label: 'Name',
					name: 'name',
					isUnique: true,
				}),
				Templates.components.textarea({
					label: 'Notes',
					name: 'notes',
					isUnique: true,
					placeholder: 'Notes about this item',
					isUnique: true,
				}),
				Templates.components.button({
					label: 'Add',
					name: 'addItem',
					isUnique: true,
					onClick: Wardrobe.item.add,
				}),
			]);
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
			function makeTab(label) {
				return m('li', [ m('a', label) ]);
			}
			
			var tabs = [];
			for (var i = 0, l = Data.groups.length; i < l; i++) {
				var label = Data[Data.groups[i] + 'Label'] || Data.groups[i];
				tabs.push(makeTab(label));
			}
			tabs.push(m('br'));
			tabs.push(makeTab(Data.outfitLabel));
			tabs.push(m('br'));
			tabs.push(makeTab(Data.addItemLabel));
			tabs.push(makeTab(Data.addOutfitLabel));
			return tabs;
		},
		
		galleries: function() {
			var galleries = [];
			for (var i = 0, l = Data.groups.length; i < l; i++) {
				galleries.push(Templates.components.gallery(Data.groups[i]));
			}
			return galleries;
		},
		
		gallery: function(group) {
			return m('span', group);
		},
		
		options: {
			colors: function(selected) {
				var options = [];
				var colors = Object.keys(Data.colors);
				for (var i = 0, l = colors.length; i < l; i++) {
					var color = colors[i];
					var hex = Data.colors[color];
					options.push(m('option', {
						value: color,
						style: 'background-color:'+hex
					}, color));
				}
				return options;
			},
			
			basic: function(source, key, selected) {
				var options = [];
				if (source === 'types') {
					source = Data[source][key];
				} else {
					source = Data[source];
				}
				for (var i = 0, l = source.length; i < l; i++) {
					var item = source[i];
					options.push(Templates.components.option(item, item));
				}
				return options;
			},
		},

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
					'for': id,
					className: 'uk-form-label'
				}, params.label),
				m('input', props)
			]);
		},
		
		select: function(params, items) {
			// params := label, value, name, isUnique, isRequired, blankFirstItem, onChange
			if (!items || !items instanceof Array) items = [];
			if (params.blankFirstItem) items.unshift(Templates.components.option('', '', true));
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : '');
			var props = {
				className: 'uk-select uk-form-small uk-form-width-auto',
				name: params.name,
				id: id,
				required: (params.required)?true:false,
			}
			if (params.onChange && params.onChange instanceof Function) props.onchange = params.onChange;
			return m('div', {
				className: 'uk-flex uk-flex-around uk-flex-column uk-padding-small'
			}, [
				m('label', {
					className: 'uk-form-label',
					'for': params.name,
				}, params.label || ''),
				m('div', {
					className:'uk-form-controls'
				},[
					m('select', props, items)
				]),
			]);
		},
		
		textarea: function(params) {
			// options := label, name, placeholder, value, length, isRequired, isUnique, rows
			if (!params.name) {
				console.error('Templates.input.textarea() params requires at least the name parameter.');
				return false;
			}
			if (!params.length) params.length = 255;
			if (!params.label) params.label = params.name || ' ';
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : '');
			return m('div', {
				className: 'uk-flex uk-flex-around uk-flex-column uk-padding-small'
			}, [
				m('label', {
					className: 'uk-form-label',
					'for': params.name,
				}, params.label),
				m('div', {
					className:'uk-form-controls'
				},[
					m('textarea', {
						className: 'uk-textarea uk-resize-vertical',
						placeholder: params.placeholder || '',
						innerHTML: params.value || '',
						name: params.name,
						id: id,
						maxlength: params.length,
						required: (params.isRequired)?true:false,
						rows: params.rows || Data.defaultTextareaRows,
					}),
				]),
			]);
		},
		
		option: function(text, value, selected, disabled) {
			// <option val='$VALUE'>$TEXT</option>
			if (value && !text) text = value;
			if (text && !value) value = text;
			if (!disabled) disabled = false;
			if (!selected) selected = false;
			return m('option', {
				innerHTML: text,
				value: value,
				disabled: disabled,
				selected: selected,
			})
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