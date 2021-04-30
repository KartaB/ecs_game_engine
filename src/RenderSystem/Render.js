import Vector2 from "../Structs/Vector2.js"

function SetBackgroundColor(_color)
{
    document.body.style.backgroundColor = _color
}

function DrawLine(_ctx, _start, _end, _color)
{
    const RenderWindowContext = _ctx

    RenderWindowContext.beginPath()
    RenderWindowContext.moveTo(_start.x, _start.y)
    RenderWindowContext.lineTo(_end.x, _end.y)
    RenderWindowContext.strokeStyle = _color
    RenderWindowContext.stroke()
    RenderWindowContext.closePath()
}

function DrawCircle(_ctx, _start, _radius, _color, _fill)
{
    const RenderWindowContext = _ctx

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

function DrawRect(_ctx, _start, _length, _color, _fill)
{
    const RenderWindowContext = _ctx

    if (_fill) {
        RenderWindowContext.fillStyle = _color;
        RenderWindowContext.fillRect(_start.x, _start.y, _length.x, _length.y);
    } else {
        RenderWindowContext.strokeStyle = _color;
        RenderWindowContext.strokeRect(_start.x, _start.y, _length.x, _length.y);
    }
}

function DrawText(_ctx, _text, _start, _color = "black", _fontSize = 30, _align = "center", _fill = true)
{
    const RenderWindowContext = _ctx

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

function DrawMultiColorText(_ctx, _start, _fontSize, _fill, _textData)
{
    const RenderWindowContext = _ctx
    let xOffset = 0

    for (const textData of _textData)
    {
        const newPos = Vector2.Copy(_start)
        newPos.x += xOffset

        DrawText(RenderWindowContext, textData.text, newPos, textData.color, _fontSize, "left", _fill)
        xOffset += MeasureText(RenderWindowContext, textData.text, _fontSize)
    }
}

function MeasureText(_ctx, _text, _fontSize)
{
    const RenderWindowContext = _ctx

    RenderWindowContext.font = `${_fontSize}px Arial`
    return RenderWindowContext.measureText(_text).width
}

export default {
    SetBackgroundColor,
    
    DrawLine,
    DrawCircle,
    DrawRect,
    DrawText,
    DrawMultiColorText,

    MeasureText
}