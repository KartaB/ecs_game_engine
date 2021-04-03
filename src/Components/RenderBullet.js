import Component from "./../BaseClass/CBaseComponent.js"

import Vector2 from "./../Structs/Vector2.js"
import Render from "./../RenderSystem/Render.js"

class RenderBullet extends Component
{
    constructor() {
        super()
    }

    Update() {
        let pos = this.owner.GetComponent("Transform").Position
        let direction = this.owner.GetComponent("MoveBullet").Direction

        let length = 25

        let x = pos.x
        let y = pos.y

        let xDir = direction.x * -length
        let yDir = direction.y * -length

        let end = new Vector2(x + xDir, y + yDir)
        Render.DrawLine(pos, end, "white")
    }
}

export default RenderBullet