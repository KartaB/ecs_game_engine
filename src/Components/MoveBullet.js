import Component from "./../BaseClass/CBaseComponent.js"

import Vector2 from "./../Structs/Vector2.js"

class MoveBullet extends Component
{
    constructor() {
        super()

        this.Speed = 300
        this.Direction = null
    }

    Update(deltaTime) {
        let moveOffset = new Vector2(this.Direction.x, this.Direction.y)
        moveOffset.Mul(this.Speed * deltaTime)
        
        let ourPos = this.owner.GetComponent("Transform").Position
        ourPos.Add(moveOffset)
    }
    
}

export default MoveBullet