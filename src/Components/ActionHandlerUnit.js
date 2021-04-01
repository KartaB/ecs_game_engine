import Component from "./../BaseClass/CBaseComponent.js"
import Ents from "./../BaseClass/CBaseStaticEntity.js"

import Utils from "./../Utility/Utils.js"

class ActionHandlerUnit extends Component
{
    constructor() {
        super("ActionHandlerUnit")
    }

    Update() {
        let friendlySquad = this.owner.GetComponent("SquadUnit").SquadID
        for(let unit of Ents.FindByClass("Unit")) {
            if (unit.GetComponent("SquadUnit").SquadID == friendlySquad) continue;

            let ourPos = this.owner.GetComponent("Transform").Position
            let unitPos = unit.GetComponent("Transform").Position
            if (Utils.Distance(ourPos, unitPos) <= 500) {
                let dir = unitPos.AimVector(ourPos)
                unit.GetComponent("Weapon").Shoot(dir)
            }
        }
    }
}

export default ActionHandlerUnit