import Component from "./../BaseClass/CBaseComponent.js"

import Utils from "./../Utility/Utils.js"

class MoveUnit extends Component
{
    constructor() {
        super("MoveUnit")

        this.Destination = null
        this.Speed = 2
    }

    Update() {
        if (this.Destination == null) return;
        
        this.MoveTowards(this.Destination)
        
        if ( this.CheckIfArrived() ) {
            this.OnArrival()
        }
    }

    MoveTowards(_dest) {
        let pos = this.owner.GetComponent("Transform").Position

        let dirVec = pos.AimVector(_dest)
        dirVec.Mul(this.Speed)

        pos.Add(dirVec)
    }

    CheckIfArrived() {
        let pos = this.owner.GetComponent("Transform").Position
        return Utils.Distance(pos, this.Destination) <= this.Speed
    }

    OnArrival() {
        this.owner.GetComponent("Transform").Position = this.Destination
        this.Destination = null
    }
}

export default MoveUnit