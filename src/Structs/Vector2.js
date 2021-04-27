class Vector2
{
    constructor(_x = 0, _y = 0) {
        this.x = _x
        this.y = _y
    }

    static Copy(_other) {
        return new Vector2(_other.x, _other.y)
    }

    Add(_other) {
        this.x += _other.x
        this.y += _other.y
    }

    Mul(_num) {
        this.x *= _num
        this.y *= _num
    }
    
    Div(_num) {
        this.x /= _num
        this.y /= _num
    }

    AngleRad(p2)
    {
        let p1 = new Vector2(this.x, this.y)
        let angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        return angleRadians
    }
    
    AngleDeg(p2)
    {
        let p1 = new Vector2(this.x, this.y)
        let angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        return angleDeg
    }

    RadToVector(radian)
    {
        let x = Math.cos(radian)
        let y = Math.sin(radian)

        return new Vector2(x, y)    
    }

    AimVector(vec2)
    {
        let aimAngle = this.AngleRad(vec2)
        let aimVector = this.RadToVector(aimAngle)

        return aimVector
    }
}

export default Vector2