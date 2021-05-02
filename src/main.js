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
    range.Min = -5
    range.Max = 5
    range.RoundValue = false

    let btnSub = new Button(canvas.GetSize().Div(2).Sub(new Vector2(range.Style.Width/2 + 25, 0)), "-")
    btnSub.Style.Cursor = "pointer"
    btnSub.SetWidth(20)
    btnSub.SetHeight(20)

    btnSub.OnMouseOver = () => {
        btnSub.Style.Background = true
        btnSub.Style.BackgroundColor = "rgb(240, 240, 240)"
    }

    btnSub.OnMouseClick = () => {
        range.Value--
    }
    
    let btnAdd = new Button(canvas.GetSize().Div(2).Add(new Vector2(range.Style.Width/2 + 25, 0)), "+")
    btnAdd.Style.Cursor = "pointer"
    btnAdd.SetWidth(20)
    btnAdd.SetHeight(20)

    btnAdd.OnMouseOver = () => {
        btnAdd.Style.Background = true
        btnAdd.Style.BackgroundColor = "rgb(240, 240, 240)"
    }

    btnAdd.OnMouseClick = () => {
        range.Value++
    }

    let changeValueInput = new TextInput(canvas.GetSize().Div(2).Add(new Vector2(-btnSub.Style.Width*2, 75)), "Enter numeric value")
    changeValueInput.IsNumeric = true
    changeValueInput.SetWidth(range.Style.Width)

    changeValueInput.OnSubmit = () => {
        range.Value = parseFloat(changeValueInput.GetValue())
    }

    let submitButton = new Button(canvas.GetSize().Div(2).Add(new Vector2(range.Style.Width/2 + 25, 75)), "Submit")
    submitButton.SetHeight(changeValueInput.Style.Height)
    submitButton.Style.Cursor = "pointer"

    submitButton.OnMouseClick = () => {
        range.Value = changeValueInput.GetValue()
    }

    submitButton.OnMouseOver = () => {
        submitButton.Style.Background = true
        submitButton.Style.BackgroundColor = "rgb(240, 240, 240)"
    }
}

export function Update(deltaTime)
{
    Canvas.GetByName("debug").DrawText("Current value:", range.Position.Sub(new Vector2(0, 100)), {align: "center"})
    Canvas.GetByName("debug").DrawText(range.Value, range.Position.Sub(new Vector2(0, 50)), {align: "center"})
}