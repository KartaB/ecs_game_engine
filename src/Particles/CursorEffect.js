import Particle from "./../BaseClass/CBaseParticle.js"

import Render from "./../RenderSystem/Render.js"

class CursorEffect extends Particle
{
    constructor(_lifetime, _pos, _scale) {
        super(_lifetime, _pos, _scale)

        this.Color = "skyblue"
    }

    Update() {
        Render.DrawCircle(this.Position, this.Scale, this.Color)
        this.Scale += 4

        if (this.Scale >= 15) {
            this.Remove()
        }
    }
}

export default CursorEffect