import Vector2 from "../Structs/Vector2.js"
import Render from "./../RenderSystem/Render.js"
import Utils from "./../Utility/Utils.js"

class Button
{
    static List = []

    constructor(_text = "Button", _pos = new Vector2()) {
        this.id = Utils.RandomID()

        this.Position = _pos
        this.Text = _text
        this.Border = true
        this.ShowBBox = false

        this.FontSize = 20
        this.Width = Render.MeasureText(this.Text, this.FontSize) + (this.FontSize * 0.66)
        this.Height = this.FontSize + (this.FontSize * 0.25)

        this.TextColor = "gray"
        this.BorderColor = "lightgray"

        this.Hovered = false

        this.UpdateBBox()

        Button.List[this.id] = this
    }

    SetPosition(_position) {
        this.Position = _position
        this.UpdateBBox()
    }

    SetWidth(_width) {
        this.Width = _width
        this.UpdateBBox()
    }
    
    SetHeight(_height) {
        this.Height = _height
        this.UpdateBBox()
    }

    UpdateBBox() {
        this.BBoxStart = new Vector2(this.Position.x - this.Width/2, this.Position.y - this.Height/2)
        this.BBoxEnd = new Vector2(this.BBoxStart.x + this.Width, this.BBoxStart.y + this.Height)
    }

    Remove() {
        delete Button.List[this.id]
    }

    OnClick() {
        
    }

    OnHoverHandler() {
        this.OnHover()
        this.Hovered = true
    }

    OnHover() {
        
    }

    OnHoverOut() {
        
    }

    Draw() {
        let textPos = new Vector2(this.Position.x, this.Position.y + (this.FontSize * 0.33))
        Render.DrawText(this.Text, textPos, this.TextColor, this.FontSize, "center")

        if (this.Border) {
            let borderStart = this.BBoxStart
            Render.DrawRect(borderStart, new Vector2(this.Width, this.Height), this.BorderColor, false)
        }

        if (this.ShowBBox) {
            Render.DrawCircle(this.BBoxStart, 3, "red")
            Render.DrawCircle(this.BBoxEnd, 3, "red")
        }
    }
}

export default Button