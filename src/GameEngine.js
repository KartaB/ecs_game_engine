import Canvas from "./RenderSystem/Canvas.js"
import { Main, Update } from "./main.js"

import { UpdateCurTime, CurTime, DeltaTime } from "./Utility/CurTime.js"
import { SetRenderedFramesCount, GetRenderedFramesCount } from "./Utility/CurTime.js"
import { SetNextFpsCheck, GetNextFpsCheck, SetFpsCount, GetFPS } from "./Utility/CurTime.js"

import Input from "./Input/InputManager.js"
import Events from "./Events/Events.js"

import Entity from "./BaseClass/CBaseEntity.js"
import Particle from "./BaseClass/CBaseParticle.js"
import Button from "./BaseClass/CBaseButton.js"

import Utils from "./Utility/Utils.js"
import Ents from "./BaseClass/CBaseStaticEntity.js"

function GameLoop()
{
    UpdateCurTime()
    Canvas.ForEach(canvas => canvas.Resize())
    
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
    
    Update(DeltaTime(), GetFPS())

    EntityTick(DeltaTime())
    ParticleTick(DeltaTime())

    for (let buttonID in buttonList) {
        buttonList[buttonID].Draw()
    }

    Input.ClearInput()
    Events.ClearEvents()

    /* FPS thingy */
    CalculateFPS()

    window.requestAnimationFrame(GameLoop)
}

/* Run those before executing game loop */
UpdateCurTime()
Canvas.ForEach(canvas => canvas.Resize())

/* Execute game loop */
Main()
window.requestAnimationFrame(GameLoop)

function EntityTick(deltaTime)
{
    Ents.ForEach(Entity.List, ent => {
        let entComponents = ent.components
        for (let component in entComponents) {
            ent.GetComponent(component).ComponentHandler(deltaTime)
        }
    })
}

function ParticleTick(deltaTime)
{
    let particleList = Particle.List
    for (let particleID in particleList) {
        particleList[particleID].ParticleTick(deltaTime)
    }
}

function CalculateFPS()
{
    SetRenderedFramesCount( GetRenderedFramesCount() + 1 )
    if (CurTime() >= GetNextFpsCheck())
    {
        SetFpsCount( GetRenderedFramesCount() )
        SetNextFpsCheck(CurTime() + 1)
    }
}