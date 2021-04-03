import { Main, Update } from "./main.js"
import { UpdateCurTime, DeltaTime } from "./Utility/CurTime.js"

import Entity from "./BaseClass/CBaseEntity.js"
import Particle from "./BaseClass/CBaseParticle.js"
import Input from "./Input/InputManager.js"
import Render from "./RenderSystem/Render.js"

function GameLoop()
{
    let deltaTime = DeltaTime()

    UpdateCurTime()
    Render.AdjustScreen()
    
    Update(deltaTime)

    let entList = Entity.List
    for (let entID in entList) {
        let entComponents = entList[entID].components
        for (let component in entComponents) {
            entList[entID].GetComponent(component).ComponentHandler(deltaTime)
        }
    }

    for (let particleID in Particle.List) {
        Particle.List[particleID].ParticleTick(deltaTime)
    }

    Input.ResetInput()

    window.requestAnimationFrame(GameLoop)
}

Main()
window.requestAnimationFrame(GameLoop)