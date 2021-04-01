import Component from "./../BaseClass/CBaseComponent.js"

class Health extends Component
{
    constructor() {
        super("Health")

        this.Health = 3
    }

    Change(_value) {
        this.Health += _value

        if (this.Health <= 0) {
            return this.owner.Remove()
        }
    }
}

export default Health