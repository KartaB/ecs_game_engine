import Vector2 from "./../Structs/Vector2.js"

const RenderWindow = document.querySelector("canvas")
const RenderWindowContext = RenderWindow.getContext("2d")

function AdjustScreen() {
    RenderWindow.width = window.innerWidth
    RenderWindow.height = window.innerHeight
}

function GetScreenSize() {
    return new Vector2(RenderWindow.width, RenderWindow.height)
}

function DrawLine(_start, _end, _color = "black")
{
    RenderWindowContext.beginPath()
    RenderWindowContext.moveTo(_start.x, _start.y)
    RenderWindowContext.lineTo(_end.x, _end.y)
    RenderWindowContext.strokeStyle = _color
    RenderWindowContext.stroke()
    RenderWindowContext.closePath()
}

function DrawCircle(_start, _radius, _color = "black", _fill = false)
{
    RenderWindowContext.beginPath()
    RenderWindowContext.arc(_start.x, _start.y, _radius, 0, 2 * Math.PI)
    if (_fill) {
        RenderWindowContext.fillStyle = _color
        RenderWindowContext.fill()
    } else {
        RenderWindowContext.strokeStyle = _color
        RenderWindowContext.stroke()
    }

    RenderWindowContext.closePath()
}

function DrawRect(_start, _length, _color = "black", _fill = false)
{
    if (_fill) {
        RenderWindowContext.fillStyle = _color;
        RenderWindowContext.fillRect(_start.x, _start.y, _length.x, _length.y);
    } else {
        RenderWindowContext.strokeStyle = _color;
        RenderWindowContext.strokeRect(_start.x, _start.y, _length.x, _length.y);
    }
}

function DrawText(_text, _start, _color = "black", _fontSize = 30, _align = "center", _fill = true)
{
    RenderWindowContext.font = `${_fontSize}px Arial`
    RenderWindowContext.textAlign = _align
    if (_fill) {
        RenderWindowContext.fillStyle = _color
        RenderWindowContext.fillText(_text, _start.x, _start.y)
    } else {
        RenderWindowContext.strokeStyle = _color
        RenderWindowContext.strokeText(_text, _start.x, _start.y)
    }
}

function MeasureText(_text, _fontSize) {
    RenderWindowContext.font = `${_fontSize}px Arial`
    return RenderWindowContext.measureText(_text).width
}

export default {
    RenderWindow,
    AdjustScreen,
    GetScreenSize,

    DrawLine,
    DrawCircle,
    DrawRect,
    DrawText,

    MeasureText
}