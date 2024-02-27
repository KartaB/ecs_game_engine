import EventManager from "../Events/EventManager.js"
import Render from "../Render/Render.js"

const Engine = {
	ShouldExit: false
}

function Exit() {
	Engine.ShouldExit = true
}

function ShouldExit() {
	return Engine.ShouldExit
}

function Dispose() {
	EventManager.removeEngineCallbacks()
	Render.getCanvas().remove()
}

export default {
	Exit,
	ShouldExit,
	Dispose
}