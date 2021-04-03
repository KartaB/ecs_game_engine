import Component from "./../../BaseClass/CBaseComponent.js"
import Ents from "./../../BaseClass/CBaseStaticEntity.js"
import Utils from "./../../Utility/Utils.js"

import { CurTime } from "./../../Utility/CurTime.js"

class CollisionBullet extends Component
{
    constructor() {
        super()
    }

    Update() {
        let units = Ents.FindByClass("Unit")
        for (let unitID of units) { 
            let unit = Ents.FindByID(unitID)

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

        this.nextUpdate = CurTime() + 0.016
    }
}

export default CollisionBullet