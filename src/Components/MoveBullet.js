import Component from "./../BaseClass/CBaseComponent.js"
import Ents from "./../BaseClass/CBaseStaticEntity.js"
import Utils from "./../Utility/Utils.js"

import Vector2 from "./../Structs/Vector2.js"

class MoveBullet extends Component
{
    constructor() {
        super("MoveBullet")

        this.Speed = 5
        this.Direction = null
    }

    Update() {
        let moveOffset = new Vector2(this.Direction.x, this.Direction.y)
        moveOffset.Mul(this.Speed)
        
        let ourPos = this.owner.GetComponent("Transform").Position
        ourPos.Add(moveOffset)

        for (let unit of Ents.FindByClass("Unit")) { 
            if (this.owner.ownerID == unit.id) continue;
            if (this.owner.ignoredSquadID == unit.GetComponent("SquadUnit").SquadID) continue;

            let bulletPos = this.owner.GetComponent("Transform").Position   
            let unitPos = unit.GetComponent("Transform").Position  
            let unitScale = unit.GetComponent("RenderUnit").Scale  

            if (Utils.Distance(bulletPos, unitPos) <= unitScale) {
                this.owner.Remove()
                unit.GetComponent("Health").Change(-1)
                return
            }
        }
    }
    
}

export default MoveBullet