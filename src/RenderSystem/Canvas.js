import Input from "../Input/InputManager.js"
import Vector2 from "../Structs/Vector2.js"
import Render from "./Render.js"

let CanvasStack = []

class Canvas
{
    constructor(_name) {
        CanvasStack[_name] = this

        this.Name = _name
        this.CanvasData = undefined

        return this
    }

    Remove() {
        this.CanvasData.Node.remove()
        delete CanvasStack[this.Name]
    }
    
    SetZIndex(_num) {
        this.CanvasData.Node.style.zIndex = _num

        return this
    }

    GetZIndex() {
        return this.CanvasData.Node.style.zIndex
    }

    Resize(_width = window.innerWidth, _height = window.innerHeight) {
        this.CanvasData.Node.width = _width
        this.CanvasData.Node.height = _height

        return this
    }

    Clear() {
        const size = this.GetSize()
        this.CanvasData.Context.clearRect(0, 0, size.x, size.y)
    }

    Update() {
        this.Resize()
    }

    GetSize() {
        return new Vector2(this.CanvasData.Node.width, this.CanvasData.Node.height)
    }

    DrawLine(_start, _end, data = {})
    {
        const { color = "black" } = data
        Render.DrawLine(this.CanvasData.Context, _start, _end, color)
    }

    DrawCircle(_start, data = {})
    {
        const { radius = 10, color = "black", fill = true } = data
        Render.DrawCircle(this.CanvasData.Context, _start, radius, color, fill)
    }

    DrawRect(_start, _length, data = {})
    {
        const { color = "black", fill = true } = data
        Render.DrawRect(this.CanvasData.Context, _start, _length, color, fill)
    }

    DrawText(_text, _start, data = {})
    {
        const { color = "black", fontSize = 30, align = "center", fill = true } = data
        Render.DrawText(this.CanvasData.Context, _text, _start, color, fontSize, align, fill)
    }

    DrawMultiColorText(_start, data = {})
    {
        const { fontSize = 30, fill = true, textData } = data
        Render.DrawMultiColorText(this.CanvasData.Context, _start, fontSize, fill, textData)
    }

    DrawImage(_img, _start, data = []) {
        const imgScale = new Vector2(_img.width, _img.height)
        const { scale = 1, dimensions = Vector2.Copy(imgScale), clipStart = new Vector2(), clipDimensions = Vector2.Copy(imgScale), flip = null } = data
        
        let newStart = Vector2.Copy(_start)
        if (flip != null) {
            const flipX = flip.includes("x") ? -1 : 1
            const flipY = flip.includes("y") ? -1 : 1

            this.CanvasData.Context.save()
            
            let canvasSize = this.GetSize()
            if (flipX == -1) {
                this.CanvasData.Context.translate(canvasSize.x, 0)
                newStart.x = canvasSize.x - newStart.x - _img.width * scale
            }
            
            if (flipY == -1) {
                this.CanvasData.Context.translate(0, canvasSize.y)
                newStart.y = canvasSize.y - newStart.y - _img.height * scale
            }

            this.CanvasData.Context.scale(flipX, flipY)
        }
        
        Render.DrawImage(this.CanvasData.Context, _img, newStart, dimensions, scale, clipStart, clipDimensions)

        if (flip != null) {
            this.CanvasData.Context.restore()
        }
    }

    MeasureText(_text, _fontSize) {
        return {
            width: Render.MeasureText(this.CanvasData.Context, _text, _fontSize),
            height: _fontSize
        }
    }
}

function GetByName(_name) {
    if (CanvasStack[_name] === null) throw `Trying to reference non-existing canvas '${name}'`

    return CanvasStack[_name]
}

function Create(_name) {
    if (CanvasStack[_name] != null) {
        console.warn(`Trying to create already existing canvas '${_name}'`)
        return CanvasStack[_name]
    }

    const CanvasDOM = document.createElement("canvas")
    CanvasDOM.id = _name
    CanvasDOM.style.zIndex = 0
    
    let canvasJS = new Canvas(_name)
    canvasJS.CanvasData = {
        Node: CanvasDOM,
        Context: CanvasDOM.getContext("2d")
    }
    canvasJS.Resize()

    document.body.appendChild(CanvasDOM)

    return canvasJS
}

function ForEach(callback) {
    for (const canvasName in CanvasStack) {
        callback( CanvasStack[canvasName] )
    }
}

export default {
    GetByName,
    Create,
    ForEach
}