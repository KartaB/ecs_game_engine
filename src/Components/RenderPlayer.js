import Component from "./../BaseClass/CBaseComponent.js"
import Render from "./../RenderSystem/Render.js"

class RenderPlayer extends Component
{
    constructor() {
        super("RenderPlayer")
    }

    Update() {
        let plyPos = this.owner.GetComponent("Transform").Position
        Render.DrawCircle(plyPos, 30, "gray")
    }
}

export default RenderPlayer