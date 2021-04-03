import Component from "./../BaseClass/CBaseComponent.js"
import Vector2 from "./../Structs/Vector2.js"

class Transform extends Component
{
    constructor() {
        super()

        this.Position = new Vector2()
    }
}

export default Transform