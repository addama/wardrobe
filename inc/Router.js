Router.add({
	path: '#/',
	before: function() { Wardrobe.pages.login.before(this.params); },
	on: function() { Wardrobe.pages.login.view(this.params); },
	after: function() { Wardrobe.pages.login.after(this.params); },
});
Router.add({
	path: '#/login',
	on: function() { Wardrobe.pages.login.before(this.params); }
});
Router.add({
	path: '#/home',
	on: function() { Wardrobe.pages.home.before(this.params); }
});
Router.add({
	path: '#/item/:id',
	on: function() { Wardrobe.pages.item.before(this.params); }
});
Router.add({
	path: '#/item/',
	on: function() { Wardrobe.pages.item.before(this.params); }
});
Router.add({
	path: '#/outfit/:id',
	on: function() { Wardrobe.pages.outfit.before(this.params); }
});
Router.add({
	path: '#/outfit/',
	on: function() { Wardrobe.pages.outfit.before(this.params); }
});

Router.init();