import { Main, Update } from "./main.js"
import { UpdateCurTime, DeltaTime } from "./Utility/CurTime.js"

import Entity from "./BaseClass/CBaseEntity.js"
import Particle from "./BaseClass/CBaseParticle.js"
import Button from "./BaseClass/CBaseButton.js"

import Input from "./Input/InputManager.js"
import Render from "./RenderSystem/Render.js"
import Utils from "./Utility/Utils.js"

function GameLoop()
{
    let deltaTime = DeltaTime()

    UpdateCurTime()
    Render.AdjustScreen()
    
    let buttonList = Button.List
    let cursorPos = Input.GetCursorPosition()

    for (let buttonID in buttonList) {
        let btn = buttonList[buttonID]   
        if ( Utils.IsVectorInBox(cursorPos, btn.BBoxStart, btn.BBoxEnd) ) {
            btn.OnHoverHandler()
            if (Input.GetLeftClick()) {
                btn.OnClick()
                Input.ResetLeftClick()
                break;
            }

        } else if (btn.Hovered) {
            btn.Hovered = false
            btn.OnHoverOut()
        }
    }
    
    Update(deltaTime)

    let entList = Entity.List
    for (let entID in entList) {
        let entComponents = entList[entID].components
        for (let component in entComponents) {
            entList[entID].GetComponent(component).ComponentHandler(deltaTime)
        }
    }

    let particleList = Particle.List
    for (let particleID in particleList) {
        particleList[particleID].ParticleTick(deltaTime)
    }

    for (let buttonID in buttonList) {
        buttonList[buttonID].Draw()
    }

    Input.ResetInput()

    window.requestAnimationFrame(GameLoop)
}

UpdateCurTime()
Render.AdjustScreen()

Main()
window.requestAnimationFrame(GameLoop)