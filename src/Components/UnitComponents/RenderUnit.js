import Vector2 from "../../Structs/Vector2.js"
import Component from "./../../BaseClass/CBaseComponent.js"
import Render from "./../../RenderSystem/Render.js"

class RenderUnit extends Component
{
    constructor() {
        super()

        this.Scale = 10
    }

    Update() {
        let unitPos = this.owner.GetComponent("Transform").Position
        let color = "gray"
        
        if (this.owner.GetComponent("SquadUnit").Selected) {
            color = "#e6c200"

            let textPos = new Vector2(unitPos.x, unitPos.y + this.Scale * 0.4)
            Render.DrawText(this.owner.GetComponent("Health").Health, textPos, "white", this.Scale + 2, "center")
        }

        Render.DrawCircle(unitPos, this.Scale, color)
    }
}

export default RenderUnit