import Mathf from "../Utility/Mathf.js"

class Color
{
    #alpha

    constructor(r, g, b, alpha = 1) {
        this.R = Mathf.Clamp(r, 0, 255)
        this.G = Mathf.Clamp(g, 0, 255)
        this.B = Mathf.Clamp(b, 0, 255)
        
        this.Alpha = alpha
    }

    set Alpha(_value) {
        const alphaValue = Mathf.Clamp(_value, 0, 255)

        this.#alpha = Mathf.Clamp(alphaValue, 0, 1)
        
        if (alphaValue > 1) {
            this.#alpha = (alphaValue/255)
        }

        this.#alpha = parseFloat(this.#alpha).toFixed(3)
    }

    get Alpha() {
        return this.#alpha
    }

    static Copy(_other) {
        return new Color(_other.R, _other.G, _other.B, _other.Alpha)
    }

    static Random()
    {
        let r = RandomInt(0, 255)
        let g = RandomInt(0, 255)
        let b = RandomInt(0, 255)
        let a = 1

        return new Color(r, g, b, a)
    }

    toHex() {
        const r = this.R.toString(16).padStart(2, "0")
        const g = this.G.toString(16).padStart(2, "0")
        const b = this.B.toString(16).padStart(2, "0")

        return `#${r}${g}${b}`.toUpperCase()
    }

    toString() {
        return `rgba(${this.R},${this.G},${this.B},${this.Alpha})`
    }
    
    valueOf() {
        return `rgba(${this.R},${this.G},${this.B},${this.Alpha})`
    }
}

export default Color