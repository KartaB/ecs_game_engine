import Component from "./../BaseClass/CBaseComponent.js"
import Bullet from "./../Entities/Bullet.js"
import { CurTime } from "./../Utility/CurTime.js"

class Weapon extends Component
{
    constructor() {
        super("Weapon")

        this.CanShoot = true
        this.NextFire = 0
        this.FireDelay = 1.25
    }

    Shoot(_dir) {
        if (this.CanShoot == false) return;
        if (this.NextFire > CurTime()) return;

        let bullet = new Bullet(this.owner.GetComponent("Transform").Position, _dir)
        bullet.ownerID = this.owner.id
        bullet.ignoredSquadID = this.owner.GetComponent("SquadUnit").SquadID

        this.NextFire = CurTime() + this.FireDelay
    }
}

export default Weapon