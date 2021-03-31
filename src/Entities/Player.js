import Entity from "../BaseClass/CBaseEntity.js"
import RenderPlayer from "./../Components/RenderPlayer.js"
import InputPlayer from "./../Components/InputPlayer.js"

class Player extends Entity
{
    constructor() {
        super()

        this.AddComponent(new RenderPlayer())
        this.AddComponent(new InputPlayer())
    }
}

export default Player