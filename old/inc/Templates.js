var Templates = {
	pages: {
		login: function() {
			return m('div', {
				id: Data.containerID + 'login',
				className: 'uk-flex uk-flex-around uk-width-1-2 uk-align-center uk-margin-large-top'
			}, [
				m('div', {
					id: 'loginPanel',
					className: 'uk-padding-small bordered dropshadow uk-flex uk-flex-around uk-width-1-1'
				}, [
					Templates.components.input({
						label: label('username'),
						name: 'username',
						isUnique: true,
						value: 'addama',
						onSubmit: App.user.checkLogin
					}),
					Templates.components.input({
						label: label('password'),
						type: 'password',
						name: 'password',
						isUnique: true,
						value: 'adonai',
						onSubmit: App.user.checkLogin
					}),
					Templates.components.button({
						label: label('login'),
						name: 'login',
						isUnique: true,
						onClick: App.user.checkLogin
					}),
				]),
			]);
		},
		
		home: function() {
			return m('div', {
				id: Data.containerID + 'home',
				className: 'uk-flex uk-flex-around uk-flex-stretch uk-height-1-1 uk-flex-column uk-width-1-1 uk-align-center'
			}, [
				m('ul', {
					id: Data.containerID + 'tabs',
					'uk-switcher': 'animation:uk-animation-fade', 
					className: 'uk-tab uk-flex-center uk-child-width-expand uk-width-1-1 uk-animation-fast',
					'uk-sticky': 'show-on-up:true',
				}, [
					Templates.components.tabs(),
				]),
				m('ul', {
					className: 'uk-switcher uk-margin uk-width-1-1 uk-align-center uk-padding-large uk-padding-small-top'
				}, [
					Templates.components.galleries(),
					Templates.pages.outfits(),
					Templates.pages.itemAdd(),
					Templates.pages.outfitAdd(),
					Templates.pages.help(),
				])
			]);
		},
		
		itemAdd: function() {
			return m('div', {
				id: Data.containerID + 'addItem',
				className: 'uk-padding-small'
			}, [
				m('h1', label('addItem')),
				m('h3', label('required')),
				m('div', {
					className: 'uk-column-1-2'
				}, [
					Templates.components.select({
						label: label('group'),
						name: 'group',
						isUnique: true,
						isRequired: true,
						blankFirstItem: true,
						onChange: function() {
							App.changeGroupSelect(this.value);
						},
					}, Templates.components.options.basic('groups')),
					Templates.components.select({
						label: label('type'),
						name: 'type',
						isUnique: true,
						isRequired: true,
						blankFirstItem: true,
						onChange: function() {
							App.changeTypeSelect(this.value);
						},
					}, []),
				]),
				m('div', {
					className: 'uk-column-1-2'	
				}, [
					Templates.components.input({
						label: label('name'),
						name: 'name',
						isUnique: true,
						isRequired: true,
					}),
					Templates.components.input({
						label: 'Brand',
						name: 'brand',
						isUnique: true,
						isRequired: true,
					}),
				]),
				m('div', {
					className: 'uk-column-1-3'	
				}, [
					Templates.components.select({
						label: label('color1'),
						name: 'color1',
						isUnique: true,
						isRequired: true,
						blankFirstItem: true,
						onChange: function(event) {
							App.changeColorSelect(this);
						},
					}, Templates.components.options.colors()),
					Templates.components.select({
						label: label('color2'),
						name: 'color2',
						isUnique: true,
						blankFirstItem: true,
						onChange: function(event) {
							App.changeColorSelect(this);
						},
					}, Templates.components.options.colors()),
					Templates.components.select({
						label: label('color3'),
						name: 'color3',
						isUnique: true,
						blankFirstItem: true,
						onChange: function(event) {
							App.changeColorSelect(this);
						},
					}, Templates.components.options.colors()),
				]),
				m('div', {
					id: Data.containerID + 'sleeveLength',
					className: 'uk-hidden',
				}, [
					Templates.components.select({
						label: label('sleeveLength'),
						name: 'sleeveLength',
						isUnique: true,
						isDisabled: true,
					}, Templates.components.options.basic('sleeveLengths', null, Data.defaults.sleeveLength)),
				]),
				m('h3', label('optional')),
				m('div', {
					className: 'uk-column-1-2'
				}, [
					Templates.components.input({
						label: label('price'),
						name: 'price',
						isUnique: true,
					}),
					Templates.components.input({
						type: 'date',
						label: label('purchased'),
						name: 'purchased',
						isUnique: true,
					}),
				]),
				m('div', {
					className: 'uk-column-1-3'
				}, [
					Templates.components.select({
						label: label('formality'),
						name: 'formality',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('formalityLevels', null, Data.defaults.formality)),
					Templates.components.select({
						label: label('warmth'),
						name: 'warmth',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('warmthLevels', null, Data.defaults.warmth)),
					Templates.components.select({
						label: label('fit'),
						name: 'fit',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('fitLevels', null, Data.defaults.fit)),
					Templates.components.select({
						label: label('material'),
						name: 'material',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('materials')),
					Templates.components.select({
						label: label('pattern'),
						name: 'pattern',
						isUnique: true,
						isRequired: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('patterns', null, Data.defaults.pattern)),
					Templates.components.select({
						label: label('wear'),
						name: 'wear',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('wearLevels', null, Data.defaults.wear)),
					Templates.components.select({
						label: label('size'),
						name: 'size',
						isUnique: true,
						blankFirstItem: true,
					}, Templates.components.options.basic('sizes', null, Data.defaults.size)),
					Templates.components.input({
						label: label('width'),
						name: 'width',
						isUnique: true,
					}),
					Templates.components.input({
						label: label('height'),
						name: 'height',
						isUnique: true,
					}),
				]),
				
				Templates.components.textarea({
					label: label('notes'),
					name: 'notes',
					isUnique: true,
					placeholder: 'Notes about this item',
					isUnique: true,
				}),
				Templates.components.button({
					label: label('addItem'),
					name: 'addItem',
					isUnique: true,
					onClick: App.item.add,
				}),
			]);
		},
		
		itemView: function() {
			return m('div','ItemView');
		},
		
		outfits: function() {
			return m('span', 'outfits');
		},
		
		outfitAdd: function() {
			return m('div','OutfitAdd');
		},
		
		outfitView: function() {
			return m('div','OutfitView');
		},
	
		help: function() {
			return m('span', 'Help');
		},
	},
	
	components: {	
		tabs: function() {
			function makeTab(name) { 
				return m('li', {
					id: Data.tabID + name
				}, [ 
					m('a', label(name)) 
				]);
			}
			
			var tabs = [];
			for (var i = 0, l = Data.groups.length; i < l; i++) {
				var name = Data.labels[Data.groups[i]] || Data.groups[i];
				tabs.push(makeTab(name));
			}
			tabs.push(
				makeTab('outfit'),
				makeTab('addItem'),
				makeTab('addOutfit'),
				makeTab('help')
			);
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
			var json = Data.db.groups[group];
			var cards = [];
			
			if (json.length) {
				for (var i = 0, l = json.length; i < l; i++) {
					cards.push(Templates.components.card(json[i]));
				}
			} else {
				cards.push(Data.messages.noItems);
			}
			
			return m('div', {
				id: Data.containerID + group + '_gallery',
				className: 'uk-flex uk-flex-around uk-flex-wrap uk-flex-top uk-flex-wrap-between uk-grid-small uk-flex-top'
			}, cards);
		},
		
		card: function(item) {
			//console.log(item);
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.containerID + Data.cardID + random;
			var colors = [ Templates.components.colorChip(item.color1) ];
			if (item.color2) colors.push(Templates.components.colorChip(item.color2));			
			if (item.color3) colors.push(Templates.components.colorChip(item.color3));
			var icon = Data.icons[item.type] || Data.icons.generic;

			return m('div', {
				id: id,
				className: 'card pointer dropshadow uk-card-hover uk-width-medium uk-margin-small-top uk-margin-small-bottom uk-inline uk-padding-remove',
				onclick: function() {
					Router.navigate('#/item/'+item.id);
				},
			}, [
				m('div', {
					className: 'uk-flex uk-flex-center uk-margin-remove uk-width-1-1 colorTray'
				}, colors),
				m('div', {
					className: 'uk-position-small uk-position-cover'
				}, [
					m('div', item.name),
					m('div', {
						className: 'subtitle uk-flex uk-flex-between'
					}, [
						m('span', item.material),
						m('span', item.formality),
						m('span', item.brand),
					]),
					m('img', {
						className: 'icon',
						src: Data.imgLoc + icon + Data.imgFile
					}),
				]),
				m('div', {
					className: 'uk-position-bottom-center'
				}, [
				m('span.uk-label', item.type),
				]),
			]);
		},
		
		colorChip: function(color) {
			return m('div', {
				className: 'colorChip uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-width-expand',
				style: 'background-color:'+color,
				title: color
			});
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
					var select = (item === selected) ? true : false;
					options.push(Templates.components.option(item, item, select));
				}
				return options;
			},
		},

		input: function(params) {
			// params := label, type, value, name, isUnique, isRequired, isHidden, isDisabled, onSubmit
			if (!params.label) params.label = params.type || Data.defaultLabelText;
			if (!params.type || Data.inputTypes.indexOf(params.type) === -1) params.type = Data.defaultInputType;
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : '');
			var props = {
				id: id,
				name: params.name,
				type: params.type,
				className: 'uk-input uk-form-small'
			}
			if (params.value) props.value = params.value;
			if (params.isRequired) props.required = 'required';
			if (params.isDisabled) props.disabled = 'disabled';
			if (params.onSubmit && params.onSubmit instanceof Function) props.onkeyup = function(event) {
				if (event.key === 'Enter') params.onSubmit(event);
			}
			return m('div', {
				// Container div
				id: Data.containerID + id,
				className: 'uk-flex uk-flex-around uk-flex-column uk-padding-small' + ((params.isHidden)?' uk-hidden':''),
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
			// params := label, value, name, isUnique, isRequired, isHidden, blankFirstItem, onChange
			if (!items || !items instanceof Array) items = [];
			if (params.blankFirstItem) items.unshift(Templates.components.option('', '', true));
			var random = Actual.string.makeRandom(Data.randomStringLength);
			var id = Data.inputID + params.name + ((!params.isUnique) ? random : '');
			var props = {
				className: 'pointer uk-select uk-form-small uk-form-width-auto',
				name: params.name,
				id: id,
			}
			if (params.isRequired) props.required = 'required';
			if (params.isDisabled) props.disabled = 'disabled';
			if (params.onChange && params.onChange instanceof Function) props.onchange = params.onChange;
			return m('div', {
				className: 'uk-flex uk-flex-around uk-flex-column uk-padding-small' + ((params.isHidden)?' uk-hidden':'')
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
				className: 'pointer uk-button uk-button-primary uk-padding-small'
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