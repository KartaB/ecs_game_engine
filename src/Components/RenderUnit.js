import Component from "./../BaseClass/CBaseComponent.js"
import Render from "./../RenderSystem/Render.js"

class RenderUnit extends Component
{
    constructor() {
        super("RenderUnit")

        this.Scale = 10
    }

    Update() {
        let unitPos = this.owner.GetComponent("Transform").Position
        let color = "gray"
        
        if (this.owner.GetComponent("SquadUnit").Selected) {
            color = "#e6c200"
        }

        Render.DrawCircle(unitPos, this.Scale, color)
    }
}

export default RenderUnit