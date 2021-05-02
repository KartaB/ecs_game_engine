import Canvas from "./RenderSystem/Canvas.js"
import Render from "./RenderSystem/Render.js"

import Ents from "./BaseClass/CBaseStaticEntity.js"
import Button from "./BaseClass/CBaseButton.js"
import TextInput from "./BaseClass/CBaseTextInput.js"
import RangeInputHorizontal from "./BaseClass/CBaseRangeInputHorizontal.js"

import Vector2 from "./Structs/Vector2.js"
import Utils from "./Utility/Utils.js"
import Mathf from "./Utility/Mathf.js"

import Input from "./Input/InputManager.js"
import Events from "./Events/Events.js"

let canvas, range
export function Main()
{
    canvas = Canvas.GetByName("debug")
    range = new RangeInputHorizontal(canvas.GetSize().Div(2))
}

export function Update(deltaTime)
{
    Canvas.GetByName("debug").DrawText(range.Value, range.Position.Sub(new Vector2(0, 100)))
}