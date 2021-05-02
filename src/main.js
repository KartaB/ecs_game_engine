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

    range.Min = -100
    range.Max = 100
    range.RoundValue = true

    let btnSub = new Button(canvas.GetSize().Div(2).Sub(new Vector2(range.Style.Width/2 + 25, 0)), "-")
    btnSub.Style.Cursor = "pointer"
    btnSub.SetWidth(20)
    btnSub.SetHeight(20)

    btnSub.OnMouseClick = () => {
        range.Value--
    }
    
    let btnAdd = new Button(canvas.GetSize().Div(2).Add(new Vector2(range.Style.Width/2 + 25, 0)), "+")
    btnAdd.Style.Cursor = "pointer"
    btnAdd.Style.Background = true
    btnAdd.Style.BackgroundColor = "lightgray"
    btnAdd.SetWidth(20)
    btnAdd.SetHeight(20)

    btnAdd.OnMouseClick = () => {
        range.Value++
    }
}

export function Update(deltaTime)
{
    Canvas.GetByName("debug").DrawText("Current value:", range.Position.Sub(new Vector2(0, 100)), {align: "center"})
    Canvas.GetByName("debug").DrawText(range.Value, range.Position.Sub(new Vector2(0, 50)), {align: "center"})
}