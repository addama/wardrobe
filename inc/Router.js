//http://michaelsogos.github.io/Hash-Router/
/*
	before, on, and after methods have the following things available to them:
		params, containing route parameters
		query, containing querystring
		url, containing the hash
		event, containing the event state and previous results (returned by task)
		task,  allowing each method to end its execution and move to the next
*/
var source = Wardrobe.pages;
Router.add({
	path: '#/',
	before: source.login.before,
	on: source.login.view,
	after: source.login.after,
});
Router.add({
	path: '#/login',
	before: source.login.before,
	on: source.login.view,
	after: source.login.after,
});
Router.add({
	path: '#/logout',
	before: source.login.before,
	on: source.login.view,
	after: source.login.after,
});
Router.add({
	path: '#/home',
	before: source.home.before,
	on: source.home.view,
	after: source.home.after,
});
Router.add({
	path: '#/item/:id',
	before: source.item.before,
	on: source.item.view,
	after: source.item.after,
});
Router.add({
	path: '#/item',
	before: source.item.before,
	on: source.item.view,
	after: source.item.after,
});
Router.add({
	path: '#/outfit/:id',
	before: source.outfit.before,
	on: source.outfit.view,
	after: source.outfit.after,
});
Router.add({
	path: '#/outfit',
	before: source.outfit.before,
	on: source.outfit.view,
	after: source.outfit.after,
});

Router.init();