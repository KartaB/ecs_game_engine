import Clickable from "./CBaseClickable.js"

import Canvas from "../RenderSystem/Canvas.js"
import Vector2 from "../Structs/Vector2.js"

class Button extends Clickable
{
    constructor(_pos = new Vector2(), _text = "Button") {
        super(_pos)

        this.Style = {
            Text: _text,
            TextColor: "black",
            FontSize: 20,
            Border: true,
            BorderColor: "black",
            Background: false,
            BackgroundColor: "black",
            Cursor: "auto",
            BBox: false
        }
        
        this.CalculateFromFont()
    }

    CalculateFromFont() {
        const textData = Canvas.GetByName("debug").MeasureText(this.Style.Text, this.Style.FontSize)
        this.SetWidth(textData.width + (this.Style.FontSize * 0.66))
        this.SetHeight(this.Style.FontSize + (this.Style.FontSize * 0.25))
    }

    Draw() {
        const canvas = Canvas.GetByName("debug")

        if (this.Style.Background) {
            let borderStart = this.BBoxStart
            canvas.DrawRect(borderStart, new Vector2(this.Style.Width, this.Style.Height), {color: this.Style.BackgroundColor, fill: true})
        }

        let textPos = new Vector2(this.Position.x, this.Position.y + (this.Style.FontSize * 0.33))
        canvas.DrawText(this.Style.Text, textPos, {color: this.Style.TextColor, fontSize: this.Style.FontSize, align: "center"})

        if (this.Style.Border) {
            let borderStart = this.BBoxStart
            canvas.DrawRect(borderStart, new Vector2(this.Style.Width, this.Style.Height), {color: this.Style.BorderColor, fill: false})
        }
    }

    OnMouseOver() {
        
    }

    OnMouseOut() {
        
    }
}

export default Button