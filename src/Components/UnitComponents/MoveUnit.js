import Component from "./../../BaseClass/CBaseComponent.js"

import Utils from "./../../Utility/Utils.js"

class MoveUnit extends Component
{
    constructor() {
        super()

        this.Destination = null
        this.Speed = 100
    }

    Update(deltaTime) {
        if (this.Destination == null) return;
        
        this.MoveTowards(this.Destination, deltaTime)
        
        if ( this.CheckIfArrived(deltaTime) ) {
            this.OnArrival()
        }
    }

    MoveTowards(_dest, dt) {
        let pos = this.owner.GetComponent("Transform").Position

        let dirVec = pos.AimVector(_dest)
        dirVec.Mul(this.Speed * dt)

        pos.Add(dirVec)
    }

    CheckIfArrived(dt) {
        let pos = this.owner.GetComponent("Transform").Position
        return Utils.Distance(pos, this.Destination) <= this.Speed * dt
    }

    OnArrival() {
        this.owner.GetComponent("Transform").Position = this.Destination
        this.Destination = null
    }
}

export default MoveUnit