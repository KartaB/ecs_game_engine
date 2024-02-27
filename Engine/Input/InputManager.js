import Vector2 from "./../Structs/Vector2.js"
import EventManager from "./../Events/EventManager.js"

/* Keyboard buttons */
const keyState = []
const mouse = new Vector2()

EventManager.addEngineCallback(document, "keydown", event => {
	const keyName = event.key.toLowerCase()

	if (keyState[keyName] === undefined || keyState[keyName] <= 0) {
		keyState[keyName] = 1
	}
})

EventManager.addEngineCallback(document, "keyup", event => {
	keyState[event.key.toLowerCase()] = -1
})

EventManager.addEngineCallback(document, "mousedown", event => {
	const buttonName = `mouse_${event.button}`

	if (keyState[buttonName] === undefined || keyState[buttonName] <= 0) {
		keyState[buttonName] = 1
	}
})

EventManager.addEngineCallback(document, "mouseup", event => {
	const buttonName = `mouse_${event.button}`

	keyState[buttonName] = -1
})

EventManager.addEngineCallback(document, "contextmenu", event => {
    event.preventDefault() // Don't open context menu
})

EventManager.addEngineCallback(document, "mousemove", event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

function update() {
	for (let key in keyState) {
		switch (keyState[key])
		{
			case 1:
				keyState[key]++;
				break;
			case -1:
				keyState[key] = 0;
				break;
		}
	}
}

function getKeyDown(key) {
	return keyState[key.toLowerCase()] === 1
}

function getKey(key) {
	return keyState[key.toLowerCase()] > 1
}

function getKeyUp(key) {
	return keyState[key.toLowerCase()] === -1
}

function getMouseButtonDown(btn) {
	return getKeyDown(`mouse_${btn}`)
}

function getMouseButton(btn) {
	return getKey(`mouse_${btn}`)
}

function getMouseButtonUp(btn) {
	return getKeyUp(`mouse_${btn}`)
}

function getCursorPos() {
	return Vector2.Copy(mouse)
}

export default {
	getKeyDown,
	getKey,
	getKeyUp,

	getMouseButtonDown,
	getMouseButton,
	getMouseButtonUp,

	getCursorPos,

	update
}