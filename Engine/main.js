import GameInstance from "./Utility/GameInstance.js"
import Core from "./System/Core.js"
import EntityComponent from "./System/EntityComponent.js"
import InputManager from "./Input/InputManager.js"
import Render from "./Render/Render.js"
import { CurTime, DeltaTime } from "./Utility/Time.js"

if ( await GameInstance.tryLoadGameInstance() ) {
	requestAnimationFrame(engineLoop)
}

function engineLoop() {
	if (Core.ShouldExit()) {
		return Core.Dispose()
	}

	const deltaTime = DeltaTime()

	Render.clear()
	EntityComponent.update(deltaTime)
	
	if (GameInstance.instance.update !== undefined) {
		GameInstance.instance.update(deltaTime)
	}

	Render.renderQueued()	
	InputManager.update()

	requestAnimationFrame(engineLoop)
}