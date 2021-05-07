import Canvas from "../RenderSystem/Canvas.js"
import Vector2 from "../Structs/Vector2.js"

class BoundingBox
{
    constructor(_start, _end)
    {
        this.Start = Vector2.Copy(_start)
        this.End = Vector2.Copy(_end)
    }

    SetPosition(_newPos) {
        const size = this.GetSize()

        this.Start = Vector2.Copy(_newPos)
        this.End = this.Start.Add(size)
    }

    GetSize() {
        return this.End.Sub(this.Start)
    }

    BBoxCollision(_other) {
        const ourSize = this.GetSize()
        const otherSize = _other.GetSize()

        return (this.Start.x < _other.Start.x + otherSize.x && this.Start.x + ourSize.x > _other.Start.x && this.Start.y < _other.Start.y + otherSize.y && this.Start.y + ourSize.y > _other.Start.y)
    }

    Draw() {
        Canvas.GetByName("debug").DrawRect(this.Start, this.End.Sub(this.Start), {fill: false, color: "orange"})
        Canvas.GetByName("debug").DrawCircle(this.Start, {fill: false, color: "red", radius: 5})
        Canvas.GetByName("debug").DrawCircle(this.End, {fill: false, color: "red", radius: 5})
    }
}

export default BoundingBox