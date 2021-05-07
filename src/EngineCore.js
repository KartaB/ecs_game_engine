import Canvas from "./RenderSystem/Canvas.js"
import * as EntryPoint from "./main.js"

import { AddFrame, GetFrameCount } from "./Utility/CurTime.js"
import { UpdateCurTime, CurTime } from "./Utility/CurTime.js"
import { DeltaTime } from "./Utility/CurTime.js"

import Input from "./Input/InputManager.js"
import Events from "./Events/Events.js"

import Entity from "./BaseClass/CBaseEntity.js"
import Clickable from "./BaseClass/CBaseClickable.js"
import Particle from "./BaseClass/CBaseParticle.js"

import Utils from "./Utility/Utils.js"
import Ents from "./BaseClass/CBaseStaticEntity.js"

Canvas.Create("debug").SetZIndex(1000)

function EngineLoop()
{
    document.body.style.cursor = "auto"
    const mousePos = Input.GetCursorPosition()

    UpdateCurTime()

    Canvas.ForEach(canvas => canvas.Update())

    HandleClickables(mousePos) 
    HandleEntities(DeltaTime())
    HandleParticles(DeltaTime())

    EntryPoint.Update(DeltaTime())

    Input.ClearInput()
    Events.ClearEvents()

    AddFrame()

    window.requestAnimationFrame(EngineLoop)
}

/* Run those before executing game loop */
UpdateCurTime()
Canvas.ForEach(canvas => canvas.Resize())

/* Execute game loop */
EntryPoint.Main()
window.requestAnimationFrame(EngineLoop)

function HandleClickables(mousePos)
{
    let foundClickables = []

    Clickable.ForEach((item) => {
        item.Update()

        if ( Utils.IsVectorInBox(mousePos, item.BBoxStart, item.BBoxEnd) ) {
            foundClickables.push(item)
        } else {
            if (item.MouseOver) {
                if (item.RetainDefaultStyle) item.RestoreStyle()
                item.OnMouseOut()
                item.MouseOver = false
            }
        }

        if (Input.GetLeftClick() || Input.GetLeftClickDown()) {
            item.Active = false
        }
    })

    if (foundClickables == 0) return

    if (foundClickables.length > 1) {
        const lowestIndex = Clickable.FindHighestZIndex(foundClickables)

        foundClickables = foundClickables.filter((item) => item.zIndex == lowestIndex)
    }

    foundClickables.forEach((item) => {
        if (item.RetainDefaultStyle) item.SaveStyle()
        item.OnMouseOver()
        item.MouseOver = true
        document.body.style.cursor = item.Style.Cursor

        if (Input.GetLeftClick()) {
            item.OnMouseClick()
            item.Active = true
        }

        if (Input.GetLeftClickDown()) {
            item.OnMouseDown()
        }

        if (Input.GetDoubleClick()) {
            item.OnDoubleClick()
        }
    })
}

function HandleEntities(deltaTime)
{
    Ents.ForEach(Entity.List, ent => {
        let entComponents = ent.components
        for (let component in entComponents) {
            ent.GetComponent(component).ComponentHandler(deltaTime)
        }
    })
}

function HandleParticles(deltaTime)
{
    let particleList = Particle.List
    for (let particleID in particleList) {
        particleList[particleID].ParticleTick(deltaTime)
    }
}