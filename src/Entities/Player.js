import Entity from "../BaseClass/CBaseEntity.js"

import Position from "../Components/Position.js"

class Player extends Entity
{
    constructor() {
        super()

        this.AddComponent(new Position())
    }
}

export default Player