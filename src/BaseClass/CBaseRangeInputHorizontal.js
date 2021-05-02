import Clickable from "./CBaseClickable.js"

import Canvas from "../RenderSystem/Canvas.js"
import Vector2 from "../Structs/Vector2.js"
import Input from "../Input/InputManager.js"
import Mathf from "../Utility/Mathf.js"

class RangeInputHorizontal extends Clickable
{
    constructor(_pos = new Vector2()) {
        super(_pos)

        this.Value = 0
        this.Min = 0
        this.Max = 10

        this.RoundValue = true
        this.DecimalPlaces = 2

        this.Style = {
            Border: true,
            BorderColor: "gray",
            Background: true,
            BackgroundColor: "lightgray",
            SliderColor: "darkgray",
            Cursor: "pointer",
            BBox: false,
        }

        this.SetWidth(300)
        this.SetHeight(10)
    }

    GetValue() {
        return this.Text
    }

    SetValue(_value) {
        this.Text = _value
    }

    Update() {
        this.ClampValue()
        this.Draw()
        this.DrawBBox()
    }

    HandleInput() {
        this.Value = this.VectorToValue(Input.GetCursorPosition())
        this.ClampValue()
    }

    Draw() {
        const canvas = Canvas.GetByName("debug")
        const rectStart = this.Position.Sub(new Vector2(this.Style.Width/2, this.Style.Height/2))

        if (this.Style.Background) {
            const style = {color: this.Style.BackgroundColor}
            canvas.DrawRect(rectStart, new Vector2(this.Style.Width, this.Style.Height), style)
        }
        
        if (this.Style.Border) {
            const style = {color: this.Style.BorderColor, fill: false}
            canvas.DrawRect(rectStart, new Vector2(this.Style.Width, this.Style.Height), style)
        }

        this.DrawRangeSlider()
    }

    DrawRangeSlider() {
        const sliderPosition = this.CalculateSliderPosition()

        Canvas.GetByName("debug").DrawCircle(sliderPosition, {radius: 10, color: this.Style.SliderColor})
        Canvas.GetByName("debug").DrawCircle(sliderPosition, {radius: 10, color: "gray", fill: false})
    }

    CalculateSliderPosition() {
        const valueRange = Math.abs(this.Min - this.Max)
        const valueDistance = -(Math.abs(this.Value - this.Max) - valueRange)
        const valuePercentage = valueDistance/valueRange

        const rangeStart = this.Position.Sub(new Vector2(this.Style.Width/2, 0))
        const sliderPosition = rangeStart.Add(new Vector2(this.Style.Width * valuePercentage, 0))
        const sliderPositionClamp = Mathf.ClampVector(sliderPosition, rangeStart, rangeStart.Add(new Vector2(this.Style.Width, 0)))
        
        return sliderPositionClamp
    }

    VectorToValue(_vec) {
        const rangeStart = this.Position.Sub(new Vector2(this.Style.Width/2, 0))
        const offset = rangeStart.x - _vec.x
        const percentage = -(offset/this.Style.Width)

        const valueRange = Math.abs(this.Min - this.Max)
        let newValue = (this.Min + (valueRange * percentage)).toFixed(this.DecimalPlaces)
        if (this.RoundValue) {
            newValue = Math.round(newValue)
        }

        return newValue
    }

    ClampValue(_min = this.Min, _max = this.Max) {
        if (this.Value < this.Min || this.Value > this.Max) {          
            this.Value = Mathf.Clamp(this.Value, this.Min, this.Max)
        }
    }

    OnMouseDown() {
        this.HandleInput()
    }
}

export default RangeInputHorizontal