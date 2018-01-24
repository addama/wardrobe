var Wardrobe = {
	getTime: function(asDate) {
		if (!asDate) asDate = false;
		return (asDate)?new Date().toJSON():Date.now();
	},
		
	makeItemID: function(object) {
		
	},
	
	json: {
		pull: function() {
			// Checks localStorage to see if the data is already there and not expired
			// Pulls the data otherwise
			var json = Wardrobe.json.newFile();
			var storage = false;
			try {
				storage = Actual.storage.get(Data.localStorageName);
			} catch(error) {}
			if (!Data.json) {
				if (storage) {
					json = JSON.parse(storage);
					Data.json = json;
					//Actual.storage.put(Data.localStorageName, json);
				} else {
					Actual.file.load(Data.jsonLoc + Data.jsonFile, function(result) {
						try {
							json = JSON.parse(result);
						} catch(error) {
							console.error(Data.errorNotFound);
							Actual.file.save(Data.jsonLoc + Data.jsonFile, JSON.stringify(json, null, '\t'), function(result) {
								console.log(result);
							})
						}
						Data.json = json;
						Actual.storage.put(Data.localStorageName, json);
					});
				}
			}
		},
		
		save: function() {
			Actual.file.save(Data.jsonLoc + Data.jsonFile, JSON.stringify(Data.json, null, '\t'), function(result) {
				console.log(result);
			});
		},
		
		newFile: function(username) {
			return {
				created: Wardrobe.getTime(),
				user: username || '',
				items: {
					top: [],
					bottom: [],
					over: [],
					under: [],
					around: [],
					shoe: [],
				},
				outfits: [],
			}
		},
		
		newItem: function(group) {
			// Creates an item object
			// Keys that are true are required, ones that are false are not
			if (!group || Data.groups.instanceof(group) === -1) return false;
			var props = {
				id: true,
				name: true,
				group: group,
				type: true,
				notes: false,
				size: {
					height: false,
					width: false,
				},
				brand: false,
				created: Wardrobe.getTime(),
				purchased: false,
				price: false,
				requiresUnder: true,
				formality: false,
				warmth: false,
				color: {
					primary: true,
					secondary: false,
					accent: false,
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
		login: function(username, password) {
			// Validates the username/password
			// Creates the cookie
			function makeCookie(username) {
				return {
					username: username,
					date: Wardrobe.getTime()
				}
			}
			
			function validate(username, password) {
				
			}
			
			var cookie = makeCookie(username);
			Actual.cookie.put(Data.cookieName, JSON.stringify(cookie));
		},
		
		logout: function() {
			// Deletes the cookie
			Actual.cookie.remove(Data.cookieName);
		},
		
		isLoggedIn: function() {
			return Actual.cookie.get(Data.cookieName);
			
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
	
	pages: {
		login: {
			before: function(params) {
				// Check login status
			},
			
			view: function(params) {
				// Display template
			},
			
			after: function(params) {
				// Bind inputs
			},
		},
		
		outfit: {
			before: function(params) {
				// Check login status
			},
			
			view: function(params) {
				// Display template
			},
			
			after: function(params) {
				// Bind inputs
			},
		},
		
		home: {
			before: function(params) {
				
			},
			
			view: function(params) {
				
			},
			
			after: function(params) {
				
			},
		},
		
		item: {
			before: function(params) {
				
			},
			
			view: function(params) {
				
			},
			
			after: function(params) {
				
			},
		},
	},
}