import Component from "./../BaseClass/CBaseComponent.js"

import Vector2 from "../Structs/Vector2.js"
import Input from "./../Input/InputManager.js"

class InputPlayer extends Component
{
    constructor() {
        super("InputPlayer")

        this.Velocity = 3
    }

    Update() {
        let moveOffset = new Vector2()

        if ( Input.GetKey("w") ) moveOffset.y -= (1 * this.Velocity)
        if ( Input.GetKey("s") ) moveOffset.y += (1 * this.Velocity)
        if ( Input.GetKey("a") ) moveOffset.x -= (1 * this.Velocity)
        if ( Input.GetKey("d") ) moveOffset.x += (1 * this.Velocity)

        this.owner.GetComponent("Transform").Position.Add(moveOffset)
    }
}

export default InputPlayer