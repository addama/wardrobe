// Redux bullshit
/*
store:
{
	"updated": (EPOCH TIME),
	"items": {
		(ITEM ID): {
			(ITEM PROPS)
		},
		...
	},
	"outfits": {
		(OUTFIT ID): {
			(OUTFIT PROPS),
			"items": [
				(ITEM IDS)
			]
		},
		...
	},
}

*/
// Action Creators

function makeActionCreator(id) {
	return (payload, isImmediate) => {
		const action = { type: id, payload };
		if (isImmediate) dispatch(action);
		return action;
	}
}

// Loads the wardrobe JSON into the store
export loadedWardrobeJSON = makeActionCreator('WARDROBE_LOAD');

// Loads item JSON into the store
export loadedItemJSON = makeActionCreator('ITEM_LOAD');

// Add, edit, delete items
export addItem = makeActionCreator('ITEM_ADD');
export editItem = makeActionCreator('ITEM_EDIT');
export removeItem = makeActionCreator('ITEM_REMOVE');

// Add, edit, delete outfits
export addOutfit = makeActionCreator('OUTFIT_ADD');
export editOutfit = makeActionCreator('OUTFIT_EDIT');
export removeOutfit = makeActionCreator('OUTFIT_REMOVE');
