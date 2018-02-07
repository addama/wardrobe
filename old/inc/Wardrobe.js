function element(id) { return document.getElementById(id); }
function label(name) {
	if (Data.labels[name]) return Actual.string.toTitleCase(Data.labels[name]);
	return Actual.string.toTitleCase(name);
}

var App = {
	getTime: function(asDate) {
		if (!asDate) asDate = false;
		return (asDate)?new Date().toJSON():Date.now();
	},
	
	draw: function draw(template) {
		// Renders the large page-based templates to the page
		m.render(document.body, template);
		m.redraw();
	},
	
	changeGroupSelect: function(group) {
		// onchange handler for the group dropdown, to select
		if (group !== '') {
			m.render(element(Data.inputID + 'type'), [
				Templates.components.option('', ''),
				Templates.components.options.basic('types', group)
			]);
		}
		element(Data.inputID + 'type').value = '';
		// Show sleeveLength for tops
		if (group === 'top') {
			App.notify.info('New option: Sleeve Length');
			element(Data.inputID + 'sleeveLength').disabled = false;
			element(Data.containerID + 'sleeveLength').classList.remove('uk-hidden');
		} else {
			element(Data.inputID + 'sleeveLength').disabled = true;
			element(Data.containerID + 'sleeveLength').classList.add('uk-hidden');
		}
		// Switch size type for bottoms
		if (group === 'bottom') {
			element(Data.inputID + 'size').disabled = true;
			element(Data.inputID + 'width').disabled = false;
			element(Data.inputID + 'height').disabled = false;
		} else {
			element(Data.inputID + 'size').disabled = false;
			element(Data.inputID + 'width').disabled = true;
			element(Data.inputID + 'height').disabled = true;
		}
		
		if (group === 'under') {
			element(Data.inputID + 'material').value = 'cotton';
		}
	},
	
	changeTypeSelect: function(type) {
		var checks = Data.typeChecks;
		if (checks.metal.indexOf(type) !== -1) element(Data.inputID + 'material').value = 'metal';
		if (checks.cotton.indexOf(type) !== -1) element(Data.inputID + 'material').value = 'cotton';
		if (checks.silk.indexOf(type) !== -1) element(Data.inputID + 'material').value = 'silk';
		if (checks.denim.indexOf(type) !== -1) element(Data.inputID + 'material').value = 'denim';
		if (checks.leather.indexOf(type) !== -1) element(Data.inputID + 'material').value = 'leather';
		if (checks.noSleeve.indexOf(type) !== -1) element(Data.inputID + 'sleeveLength').value = 'none';
		if (checks.noLength.indexOf(type) !== -1) {
			element(Data.inputID + 'height').disabled = true;
		} else {
			element(Data.inputID + 'height').disabled = false;
		}
	},
	
	changeColorSelect: function(element) {
		// onchange handler for the color dropdowns, changing the color of the select
		var selected = element.options[element.selectedIndex];
		if (selected) {
			var color = selected.style.backgroundColor || '#fff';
			element.style.backgroundColor = color;
		}
	},
	
	json: {
		pull: function() {
			// Checks localStorage to see if the data is already there and not expired
			// Pulls the data otherwise
			if (Actual.util.fromConsole()) return Actual.util.wait(1000000);
			return Actual.file.load(Data.jsonLoc + Data.jsonFile).then(function(result) {
				try {
					Data.json = JSON.parse(result);
					return Actual.util.wait(Data.waitTime);
				} catch (error) {
					// There's no file to pull or an error
					console.error(Data.messages.needNewJSON);
					App.notify.info(Data.messages.needNewJSON);
					var json = App.json.newFile();
					return Actual.file.save(Data.jsonLoc + Data.jsonFile, JSON.stringify(json)).then(function(result) {
						if (result) {
							Data.json = json;
						} else {
							console.error(Data.messages.jsonWriteFail);
							App.notify.bad(Data.messages.jsonWriteFail);
						}
						return Actual.util.wait(Data.waitTime);
					});
				}
			});
		},
		
		save: function() {
			Actual.file.save(Data.jsonLoc + Data.jsonFile, JSON.stringify(Data.json, null, '\t'), function(result) {
				console.log(result);
			});
		},
		
		process: function() {
			// Processes the JSON, pulling out subsets we know we'll need
			
			// Item groups
			for (var i = 0, l = Data.groups.length; i < l; i++) {
				var group = Data.groups[i];
				Data.db.groups[group] = App.item.getByCriterion('group', group);
			}
		},
		
		newFile: function(username) {
			return {
				created: App.getTime(),
				updated: App.getTime(),
				items: [],
				outfits: [],
			}
		},
		
		newItem: function(params) {
			// Creates an item object
			// Keys that are true are required, ones that are false are not
			var props = {
				id: false,					// CARHARTT_TOP_TSHIRT_ORANGE_123456789
				brand: false,				// 'Carhartt'
				group: false,					// 'top'
				type: false,					// 'tshirt'
				name: false,					// 'Chili Heather Carhartt Shirt'
				notes: false,				// 'Comfortable, bought at Carhartt store'
				created: App.getTime(),	// 123456789
				purchased: false,			// 123456789
				price: false,				// '16.99'
				formality: false,			// 'casual'
				material: false,				// 'cotton'
				pattern: false,				// 'heather'
				warmth: false,				// 'warm'
				fit: false,					// 'fits well'
				wear: false,					// 'like-new'
				size: false,					// 'l'
				height: false,				// null
				width: false,				// null
				sleeveLength: false,			// 'short'
				color1: false,				// 'orange'
				color2: false,				// 'gray'
				color3: false,				// null
			};
			if (!params) return props;
			for (var i = 0, l = Object.keys(props).length; i < l; i++) {
				var key = Object.keys(props)[i];
				if (params[key] && params[key].disabled === false) props[key] = params[key].value;
			}
			props.id = App.item.makeItemID(props);
			return props;
		},
		
		newOutfit: function() {
			var props = {
				id: true,
				name: true,
				items: {
					top: {},
					bottom: {},
					over: {},
					under: {},
					around: {},
					shoe: {},
				},
			}
			return props;
		},
	},
	
	user: {
		checkLogin: function() {
			function validate(username, password) {
				return Actual.util.ajax('./inc/validate.php', {u:username,p:password}, 'POST').then(function(result) {
					return (result.toString() === '0') ? true : false;
				})
			}
						
			var data = Actual.util.getFormData(Data.containerID + 'login');
			if (data) {
				var username = data['username'].value;
				var password = data['password'].value;
				if (!username || !password) {
					App.notify.bad(Data.messages.loginIncomplete);
					return false;
				}
				validate(username, password).then(function(result) {
					if (result) {
						App.json.pull().then(function(result) {
							App.json.process();
							App.notify.good(Data.messages.loginCorrect);
							Router.navigate('#/home');
						});
					} else {
						App.notify.bad(Data.messages.loginIncorrect);	
					}
				})
			}
		},
				
		logout: function() {
			// Deletes the cookie
			Actual.storage.remove(Data.cookieName);
			Actual.storage.remove(Data.localStorageName);
			Data.json = false;
			App.notify.info(Data.messages.loggedOut);
		},
		
		isLoggedIn: function() {
			// Check for cookie
			// If cookie exists, check expiration
			// If cookie is beyond expiration, delete it
			if (Data.json) return true;
			return false;
		},
	},
	
	item: {
		makeItemID: function(object) {
			// Creates a unique ID for an item
			// id := $brand_$type_$color1_$created
			return[ object.brand, object.type, object.color1, object.created ].join(Data.itemIDSeparator); 
		},
		
		getByCriterion: function(key, value) {
			// Combs the JSON to pull out items whose key matches the given value
			var items = [];
			for (var i = 0, l = Data.json.items.length; i < l; i++) {
				var item = Data.json.items[i];
				if (item[key] === value) items.push(item);
			}
			return items;
		},

		add: function() {
			function validate(form) {
				var bads = [];
				for (var i = 0, l = Object.keys(form).length; i < l; i++) {
					var item = form[Object.keys(form)[i]];
					if (item.required && !item.disabled && item.value === '') {
						bads.push(label(item.name));
					}
				}
				return bads;
			}
			
			var data = Actual.util.getFormData(Data.containerID + 'addItem');
			var validation = validate(data);
			if (validation.length) {
				App.notify.bad('The following fields are required: '+ validation.join(', '));
				return false;
			}
			
			var json = App.json.newItem(data);
			console.log(json);
			Data.json.items.push(json);
			App.json.save();
			App.json.process();
			App.notify.info('New item created!');
			Router.navigate('#/home');
		},
	},
	
	outfit: {
		getFormality: function(outfit) {
			
		},
		
		getWarmth: function(outfit) {
			
		},
		
		suggest: function(outfit) {
			
		},
	},
	
	notify: {
		// Creates a UIKit notification in one of 3 flavors: good, bad, and info
		// raw() is only used by these 3 as the base function, not used externally
		// Configuration in Data.notifications
		raw: function notifyRaw(text, type, position, timeout) {
			UIkit.notification({
				message: text,
				status: type || 'primary',
				pos: position || Data.notifications.position,
				timeout: timeout || Data.notifications.timeout
			});
		},
		
		good: function notifyGood(text) {
			this.raw('<span uk-icon="icon:check"></span>' + text, 'success');
		},
		
		bad: function notifyBad(text) {
			this.raw('<span uk-icon="icon:warning"></span>' + text, 'danger', null, Data.notifications.timeout * 2);
		},
		
		info: function notifyInfo(text) {
			this.raw('<span uk-icon="icon:info"></span>' + text, 'primary');
		},
	},
	
	pages: {
		login: {
			before: function() {
				// Check login status
				if (App.user.isLoggedIn()) {
					App.notify.info(Data.messages.alreadyLoggedIn);
					Router.navigate('#/home');
				}
				this.task.done();
			},
			
			view: function() {
				// Display template
				App.draw(Templates.pages.login());
				this.task.done();
			},
			
			after: function() {
				// Bind inputs
			},
		},
		
		outfit: {
			before: function() {
				if (!App.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					App.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				// Display template
				console.log('outfit', this.params);
				if (this.params.id) {
					App.draw(Templates.pages.outfitView());
				} else {
					App.draw(Templates.pages.outfitAdd());
				}
			},
			
			after: function() {
				// Bind inputs
			},
		},
		
		home: {
			before: function() {
				if (!App.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					App.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				App.draw(Templates.pages.home());
			},
			
			after: function() {
				
			},
		},
		
		item: {
			before: function() {
				if (!App.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					App.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				console.log('item', this.params);
				if (this.params.id) {
					App.draw(Templates.pages.itemView());
				} else {
					App.draw(Templates.pages.itemAdd());
				}
			},
			
			after: function() {
				
			},
		},
	},
}