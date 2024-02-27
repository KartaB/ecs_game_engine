const events = []

function addEngineCallback(element, type, listener) {
	element.addEventListener(type, listener)
	events.push({ element: element, type: type, listener: listener })
}

function removeEngineCallbacks() {
	events.forEach(x => {
		x.element.removeEventListener(x.type, x.listener)
	})

	events.length = 0
}

export default {
	addEngineCallback,
	removeEngineCallbacks
}