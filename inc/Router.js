//http://michaelsogos.github.io/Hash-Router/
/*
	before, on, and after methods have the following things available to them:
		params, containing route parameters
		query, containing querystring
		url, containing the hash
		event, containing the event state and previous results (returned by task)
		task,  allowing each method to end its execution and move to the next
*/

Router.add({
	path: '#/',
	before: Wardrobe.pages.login.before,
	on: Wardrobe.pages.login.view,
	after: Wardrobe.pages.login.after,
});
Router.add({
	path: '#/login',
	before: Wardrobe.pages.login.before,
	on: Wardrobe.pages.login.view,
	after: Wardrobe.pages.login.after,
});
Router.add({
	path: '#/logout',
	before: Wardrobe.pages.login.before,
	on: Wardrobe.pages.login.view,
	after: Wardrobe.pages.login.after,
});
Router.add({
	path: '#/home',
	before: Wardrobe.pages.home.before,
	on: Wardrobe.pages.home.view,
	after: Wardrobe.pages.home.after,
});
Router.add({
	path: '#/item/:id',
	before: Wardrobe.pages.item.before,
	on: Wardrobe.pages.item.view,
	after: Wardrobe.pages.item.after,
});
Router.add({
	path: '#/item',
	before: Wardrobe.pages.item.before,
	on: Wardrobe.pages.item.view,
	after: Wardrobe.pages.item.after,
});
Router.add({
	path: '#/outfit/:id',
	before: Wardrobe.pages.outfit.before,
	on: Wardrobe.pages.outfit.view,
	after: Wardrobe.pages.outfit.after,
});
Router.add({
	path: '#/outfit',
	before: Wardrobe.pages.outfit.before,
	on: Wardrobe.pages.outfit.view,
	after: Wardrobe.pages.outfit.after,
});

Router.init();