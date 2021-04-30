import Vector2 from "../Structs/Vector2.js"
import Render from "./Render.js"

let CanvasStack = []

class Canvas
{
    constructor(_name) {
        CanvasStack[_name] = this

        this.Name = _name
        this.CanvasData = undefined
    }

    Remove() {
        this.CanvasData.Node.remove()
        delete CanvasStack[this.Name]
    }
    
    SetZBuffer(_num) {
        this.CanvasData.Node.style.zIndex = _num
    }

    GetZBuffer() {
        return this.CanvasData.Node.style.zIndex
    }

    Resize() {
        this.CanvasData.Node.width = window.innerWidth
        this.CanvasData.Node.height = window.innerHeight
    }

    GetSize() {
        return new Vector2(this.CanvasData.Node.width, this.CanvasData.Node.height)
    }

    DrawLine(_start, _end, _color = "black") {
        Render.DrawLine(this.CanvasData.Context, _start, _end, _color)
    }

    DrawCircle(_start, _radius, _color = "black", _fill = false) {
        Render.DrawCircle(this.CanvasData.Context, _start, _radius, _color, _fill)
    }

    DrawRect(_start, _length, _color = "black", _fill = false) {
        Render.DrawRect(this.CanvasData.Context, _start, _length, _color, _fill)
    }

    DrawText(_text, _start, _color = "black", _fontSize = 30, _align = "center", _fill = true) {
        Render.DrawText(this.CanvasData.Context, _text, _start, _color, _fontSize, _align, _fill)
    }

    DrawMultiColorText(_start, _fontSize, _fill, _textData) {
        Render.DrawMultiColorText(this.CanvasData.Context, _start, _fontSize, _fill, _textData)
    }

    MeasureText(_text, _fontSize) {
        return Render.MeasureText(this.CanvasData.Context, _text, _fontSize)
    }
}

function GetByName(_name) {
    return CanvasStack[_name]
}

function Create(_name) {
    if (CanvasStack[_name] != null) {
        console.warn(`Trying to create already existing canvas: ${_name}`)
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