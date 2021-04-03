import Component from "../../BaseClass/CBaseComponent.js"
import Ents from "../../BaseClass/CBaseStaticEntity.js"

import Utils from "../../Utility/Utils.js"
import { CurTime } from "../../Utility/CurTime.js"

class ActionHandlerUnit extends Component
{
    constructor() {
        super()
    }

    Update() {
        let friendlySquad = this.owner.GetComponent("SquadUnit").SquadID

        let units = Ents.FindByClass("Unit")
        for(let unitID of units) {
            let unit = Ents.FindByID(unitID)
            if (unit.GetComponent("SquadUnit").SquadID == friendlySquad) continue;

            let ourPos = this.owner.GetComponent("Transform").Position
            let unitPos = unit.GetComponent("Transform").Position
            if (Utils.Distance(ourPos, unitPos) <= 500) {
                let dir = unitPos.AimVector(ourPos)
                unit.GetComponent("Weapon").Shoot(dir)
            }
        }

        this.nextUpdate = CurTime() + 0.5
    }
}

export default ActionHandlerUnit