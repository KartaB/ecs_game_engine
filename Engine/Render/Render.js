import Vector2 from "../Structs/Vector2.js"
import EventManager from "../Events/EventManager.js"
import RenderLineCommand from "./RenderCommands/RenderLineCommand.js"
import RenderCircleCommand from "./RenderCommands/RenderCircleCommand.js"
import RenderRectCommand from "./RenderCommands/RenderRectCommand.js"
import RenderTextCommand from "./RenderCommands/RenderTextCommand.js"
import RenderImageCommand from "./RenderCommands/RenderImageCommand.js"

const Viewport = {
	Canvas: null,
	Context: null,

	Size: new Vector2(window.innerWidth, window.innerHeight)
}

const renderQueue = []

EventManager.addEngineCallback(window, "resize", event => {
    const canvas = getCanvas()

	Viewport.Size.x = window.innerWidth
	Viewport.Size.y = window.innerHeight

	canvas.width = Viewport.Size.x
	canvas.height = Viewport.Size.y
})

function getCanvas() {
	if (Viewport.Canvas === null) {
		Viewport.Canvas = document.querySelector("canvas")

		if (Viewport.Canvas === null) {
			Viewport.Canvas = document.createElement("canvas")
			maximize()

			document.body.appendChild(Viewport.Canvas)
		}
	}

	return Viewport.Canvas
}

function getContext() {
	if (Viewport.Context === null) {
		Viewport.Context = getCanvas().getContext("2d")
	}

	return Viewport.Context
}

function maximize() {
	Viewport.Size.x = window.innerWidth
	Viewport.Size.y = window.innerHeight

	const canvas = getCanvas()

	canvas.width = Viewport.Size.x
	canvas.height = Viewport.Size.y

	canvas.style.position = "absolute"
	canvas.style.left = 0
	canvas.style.top = 0	
}

function clear() {
	getContext().clearRect(0, 0, Viewport.Size.x, Viewport.Size.y);
}

function renderQueued() {
	const ctx = getContext()

	renderQueue.forEach(cmd => {
		cmd.draw(ctx)
	})

	renderQueue.length = 0
}

function getScreenSize() {
	return Vector2.Copy(Viewport.Size)
}

function drawLine(data) {
	renderQueue.push(new RenderLineCommand(data))
}

function drawCircle(data) {
	renderQueue.push(new RenderCircleCommand(data))
}

function drawRect(data) {
	renderQueue.push(new RenderRectCommand(data))
}

function drawText(data) {
	renderQueue.push(new RenderTextCommand(data))
}

function drawImage(data) {
	renderQueue.push(new RenderImageCommand(data))
}

export default {
	getCanvas,
	getContext,
	
	maximize,
	clear,
	renderQueued,

	drawLine,
	drawCircle,
	drawRect,
	drawText,
	drawImage,

	getScreenSize,
}