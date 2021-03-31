class Vector2
{
    constructor(_x = 0, _y = 0) {
        this.x = _x
        this.y = _y
    }

    Add(_other) {
        this.x += _other.x
        this.y += _other.y
    }
}

export default Vector2