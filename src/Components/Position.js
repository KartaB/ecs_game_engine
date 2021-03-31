import Component from "./../BaseClass/CBaseComponent.js"
import Vector2 from "./../Structs/Vector2.js"

class Position extends Component
{
    constructor() {
        super()

        this.name = "Position"

        this.Position = new Vector2()
    }
}

export default Position