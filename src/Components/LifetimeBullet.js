import Component from "./../BaseClass/CBaseComponent.js"
import { CurTime } from "./../Utility/CurTime.js"

class LifetimeBullet extends Component
{
    constructor() {
        super("LifetimeBullet")

        this.Lifetime = CurTime() + 5
    }

    Update() {
        if (CurTime() >= this.Lifetime) {
            return this.owner.Remove()
        }
    }
}

export default LifetimeBullet