var Data = {
	// Architecture
	jsonLoc: '../json/',
	cookieName: 'wardrobe_login',
	localStorageName: 'wardrobe_json',
	
	// Time
	minute: 1 * 60 * 1000,		// 1 minute
	day: 24 * 60 * 60 * 1000, 	// 1 day
	week: 7 * 24 * 60 * 60 * 1000,			// 1 week
	
	// Item Groups and Types
	topLabel: 'top',
	bottomLabel: 'bottom',
	overLabel: 'over',
	underLabel: 'under',
	aroundLabel: 'accessory',
	shoeLabel: 'shoe',
	
	groups: [ 'top', 'bottom', 'over', 'under', 'accessory', 'shoe' ],
	types: {
		top: [ 'tshirt', 'sweater', 'tanktop' ],
		bottom: [ 'jeans', 'jogger', 'shorts', 'trunks', 'pajama' ],
		over: [ 'coldweather', 'lightweight', 'rain', 'hoodie', 'sweatshirt' ],
		under: [ 'undershirt', 'wifebeater', 'underwear', 'sock' ],
		around: [ 'ring', 'necklace', 'bracelet', 'belt', 'tie' ],
		shoe: [ 'sport', 'boot', 'sandal', 'fashion' ],
	},
	sleeveLengths: [ 'none', 'short', 'middle', 'long' ],
	materials: [ 'cotton', 'wool', 'denim', 'canvas', 'linen', 'leather', 'suede/nubuck', 'polyester', 'silk', 'nylon', 'velvet', 'satin', 'blend', 'unknown', 'metal' ],	
	
	// DOM
	defaultColor: '#000000',
	defaultInputType: 'text',
	defaultButtonType: 'button',
	defaultLabelText: 'Input',
	defaultButtonText: 'Go',
	inputTypes: [
		'text', 'date', 'email', 'number', 'range', 'color', 'checkbox', 'radio', 
		'search', 'tel', 'password', 'hidden', 'time',
	],
	buttonTypes: [
		'button', 'submit', 'reset'
	],
	randomStringLength: 8,
	inputID: 'input_',
	containerID: 'container_',
	labelID: 'label_',
	buttonID: 'button_',
	colorID: 'color_',
	
	json: {},
}