import Entity from "./../BaseClass/CBaseEntity.js"

import Health from "./../Components/Health.js"
import MoveUnit from "./../Components/MoveUnit.js"
import SquadUnit from "./../Components/SquadUnit.js"
import Weapon from "../Components/Weapon.js"
import ActionHandlerUnit from "../Components/ActionHandlerUnit.js"
import RenderUnit from "./../Components/RenderUnit.js"

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