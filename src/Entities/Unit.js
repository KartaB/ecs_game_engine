import Entity from "./../BaseClass/CBaseEntity.js"

import Health from "./../Components/Health.js"
import MoveUnit from "./../Components/UnitComponents/MoveUnit.js"
import SquadUnit from "./../Components/UnitComponents/SquadUnit.js"
import Weapon from "../Components/UnitComponents/Weapon.js"
import ActionHandlerUnit from "../Components/UnitComponents/ActionHandlerUnit.js"
import RenderUnit from "./../Components/UnitComponents/RenderUnit.js"

class Unit extends Entity
{
    constructor() {
        super()

        this.AddComponent(new Health())
        this.AddComponent(new MoveUnit())
        this.AddComponent(new SquadUnit())
        this.AddComponent(new Weapon())
        this.AddComponent(new ActionHandlerUnit())
        this.AddComponent(new RenderUnit())
    }
}

export default Unit