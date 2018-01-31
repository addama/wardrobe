var Wardrobe = {
	getTime: function(asDate) {
		if (!asDate) asDate = false;
		return (asDate)?new Date().toJSON():Date.now();
	},
	
	draw: function draw(template) {
		// Renders the large page-based templates to the page
		m.render(document.body, template);
		m.redraw();
	},
	
	changeTypeSelect: function(group) {
		// onchange handler for the group dropdown, to select
		var target = document.getElementById('input_type');
		m.render(target, [
			Templates.components.option('', ''),
			Templates.components.options.basic('types', group)
		]);
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
					var json = Wardrobe.json.newFile();
					return Actual.file.save(Data.jsonLoc + Data.jsonFile, JSON.stringify(json)).then(function(result) {
						if (result) {
							Data.json = json;
						} else {
							console.error(Data.messages.jsonWriteFail);
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
				Data.db.groups[group] = Wardrobe.item.getByCriterion('group', group);
			}
		},
		
		newFile: function(username) {
			return {
				created: Wardrobe.getTime(),
				updated: Wardrobe.getTime(),
				items: [],
				outfits: [],
			}
		},
		
		newItem: function(group) {
			// Creates an item object
			// Keys that are true are required, ones that are false are not
			if (!group || Data.groups.instanceof(group) === -1) return false;
			var props = {
				id: true,					// CARHARTT-TOP-TSHIRT-ORANGE-123456789
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
				created: Wardrobe.getTime(),	// 123456789
				purchased: false,			// 123456789
				price: false,				// '16.99'
				requiresUnder: true,			// false
				formality: false,			// 1
				warmth: false,				// 1
				color: {
					primary: true,			// 'orange'
					secondary: false,		// 'gray'
					accent: false,			// null
				},
				
			}
			
			if (group === 'top') {
				item.size.sleeve = false;
			}
			
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
					Wardrobe.notify.bad(Data.messages.loginIncomplete);
					return false;
				}
				validate(username, password).then(function(result) {
					if (result) {
						Wardrobe.json.pull().then(function(result) {
							Wardrobe.json.process();
							Wardrobe.notify.good(Data.messages.loginCorrect);
							Router.navigate('#/home');
						});
					} else {
						Wardrobe.notify.bad(Data.messages.loginIncorrect);	
					}
				})
			}
		},
				
		logout: function() {
			// Deletes the cookie
			Actual.storage.remove(Data.cookieName);
			Actual.storage.remove(Data.localStorageName);
			Data.json = false;
			Wardrobe.notify.info(Data.messages.loggedOut);
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
			// id := $brand_$group_$type_$color_$created
			return[ object.brand, object.group, object.type, object.color.primary, object.created ].join(Data.itemIDSeparator); 
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
			var data = Actual.util.getFormData(Data.containerID + 'addItem');
			console.log(data);
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
			this.raw(Data.icons.good + text, 'success');
		},
		
		bad: function notifyBad(text) {
			this.raw(Data.icons.bad + text, 'danger');
		},
		
		info: function notifyInfo(text) {
			this.raw(Data.icons.info + text, 'primary');
		},
	},
	
	pages: {
		login: {
			before: function() {
				// Check login status
				if (Wardrobe.user.isLoggedIn()) {
					Wardrobe.notify.info(Data.messages.alreadyLoggedIn);
					Router.navigate('#/home');
				}
				this.task.done();
			},
			
			view: function() {
				// Display template
				Wardrobe.draw(Templates.pages.login());
				this.task.done();
			},
			
			after: function() {
				// Bind inputs
			},
		},
		
		outfit: {
			before: function() {
				if (!Wardrobe.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					Wardrobe.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				// Display template
				console.log('outfit', this.params);
				if (this.params.id) {
					Wardrobe.draw(Templates.pages.outfitView());
				} else {
					Wardrobe.draw(Templates.pages.outfitAdd());
				}
			},
			
			after: function() {
				// Bind inputs
			},
		},
		
		home: {
			before: function() {
				if (!Wardrobe.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					Wardrobe.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				Wardrobe.draw(Templates.pages.home());
			},
			
			after: function() {
				
			},
		},
		
		item: {
			before: function() {
				if (!Wardrobe.user.isLoggedIn()) {
					Router.navigate('#/login');
				} else {
					var context = this;
					Wardrobe.json.pull().then(function(result) {
						context.task.done();
					});
				}
			},
			
			view: function() {
				console.log('item', this.params);
				if (this.params.id) {
					Wardrobe.draw(Templates.pages.itemView());
				} else {
					Wardrobe.draw(Templates.pages.itemAdd());
				}
			},
			
			after: function() {
				
			},
		},
	},
}