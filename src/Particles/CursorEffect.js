import Particle from "./../BaseClass/CBaseParticle.js"

import Render from "./../RenderSystem/Render.js"

class CursorEffect extends Particle
{
    constructor() {
        super(1)

        this.Color = "blue"
    }

    Update() {
        Render.DrawCircle()
    }
}

export default CursorEffect