import Canvas from "./RenderSystem/Canvas.js"
import Render from "./RenderSystem/Render.js"

import Ents from "./BaseClass/CBaseStaticEntity.js"
import Button from "./BaseClass/CBaseButton.js"

import Vector2 from "./Structs/Vector2.js"
import Utils from "./Utility/Utils.js"

import Input from "./Input/InputManager.js"
import Events from "./Events/Events.js"
import Entity from "./BaseClass/CBaseEntity.js"

const mainCanvas = Canvas.Create("main")

export function Main()
{
}

export function Update(deltaTime)
{
    mainCanvas.DrawMultiColorText(new Vector2(200, 200), 32, true, 
    [
        { text: "Multi ", color: Input.GetKey("a") ? "blue" : "lightblue" },
        { text: "color ", color: Input.GetKey("s") ? "red" : "pink" },
        { text: "text", color: Input.GetKey("d") ? "green" : "lightgreen" },
    ])
}