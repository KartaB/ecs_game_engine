import Entity from "../BaseClass/CBaseEntity.js"
import RenderPlayer from "./../Components/RenderPlayer.js"
import InputPlayer from "./../Components/InputPlayer.js"

class Player extends Entity
{
    constructor() {
        super()

        this.AddComponent(new InputPlayer())
        this.AddComponent(new RenderPlayer())
    }
}

export default Player