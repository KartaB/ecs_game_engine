import Canvas from "../RenderSystem/Canvas.js"
import Vector2 from "../Structs/Vector2.js"
import Utils from "./../Utility/Utils.js"

class Clickable
{
    static List = []

    constructor(_pos = new Vector2()) {
        this.id = Utils.RandomID()
        this.zIndex = 0       
        this.Position = _pos

        this.MouseOver = false
        this.Active = false
        
        this.RetainDefaultStyle = true

        this.Style = {
            Width: 0,
            Height: 0,
            BBox: false
        }

        this.SetWidth(48)
        this.SetHeight(48)
        
        Clickable.List[this.id] = this
    }

    SetPosition(_position) {
        this.Position = _position
        this.UpdateBBox()
    }

    SetWidth(_width) {
        this.Style.Width = _width
        this.UpdateBBox()
    }
    
    SetHeight(_height) {
        this.Style.Height = _height
        this.UpdateBBox()
    }

    UpdateBBox() {
        this.BBoxStart = new Vector2(this.Position.x - this.Style.Width/2, this.Position.y - this.Style.Height/2)
        this.BBoxEnd = new Vector2(this.BBoxStart.x + this.Style.Width, this.BBoxStart.y + this.Style.Height)
    }

    Remove() {
        delete Clickable.List[this.id]
    }

    Update() {
        this.Draw()
        this.DrawBBox()
    }

    OnMouseClick() {}
    OnMouseDown() {}
    OnDoubleClick() {}

    OnMouseOver() {}
    OnMouseOut() {}

    Draw() {}

    DrawBBox()
    {
        if (this.Style.BBox) {
            const debugCanvas = Canvas.GetByName("debug")

            debugCanvas.DrawCircle(this.BBoxStart, {radius: 4, color: "red", fill: false})
            debugCanvas.DrawCircle(this.BBoxEnd, {radius: 4, color: "red", fill: false})
            debugCanvas.DrawRect(this.BBoxStart, this.BBoxEnd.Sub(this.BBoxStart), {fill: false, color: "orange"})
        }
    }

    SaveStyle() {
        if (this.MouseOver == false) {
            this.SavedStyle = {...this.Style}
        }
    }

    RestoreStyle() {
        this.Style = this.SavedStyle
        this.UpdateBBox()
    }

    static ForEach(callback) {
        for (const id in Clickable.List) {
            callback(Clickable.List[id])
        }
    }

    static FindHighestZIndex(array) {
        let highest = array[0].zIndex

        array.forEach((item) => {
            highest = item.zIndex > highest ? item.zIndex : highest
        })

        return highest
    }
}

export default Clickable