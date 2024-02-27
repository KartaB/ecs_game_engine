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

    static hslToRgb(hsl) {
        hsl = hsl.match(/^hsla?\(\s?(\d+)(?:deg)?,?\s(\d+)%,?\s(\d+)%,?\s?(?:\/\s?\d+%|\s+[\d+]?\.?\d+)?\)$/i);
        if (!hsl) {
            return null;
        }
        let C, X, r, g, b, m

        var h = hsl[1];
        var s = hsl[2];
        var l = hsl[3];
        s /= 100;
        l /= 100;
        C = (1 - Math.abs(2 * l - 1)) * s;
        var hue = h / 60;
        X = C * (1 - Math.abs(hue % 2 - 1));
        r = g = b = 0;
        if (hue >= 0 && hue < 1) {
            r = C;
            g = X;
        } else if (hue >= 1 && hue < 2) {
            r = X;
            g = C;
        } else if (hue >= 2 && hue < 3) {
            g = C;
            b = X;
        } else if(hue >= 3 && hue < 4) {
            g = X;
            b = C;
        } else if (hue >= 4 && hue < 5) {
            r = X;
            b = C;
        } else {
            r = C;
            b = X;
        }
        m = l - C / 2;
        r += m;
        g += m;
        b += m;
        r *= 255.0;
        g *= 255.0;
        b *= 255.0;
        
        return new Color(Math.round(r), Math.round(g), Math.round(b));
    }
}

export default Color