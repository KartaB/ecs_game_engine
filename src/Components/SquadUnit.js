import Component from "./../BaseClass/CBaseComponent.js"

class SquadUnit extends Component
{
    constructor() {
        super("SquadUnit")

        this.SquadID = ""
        this.Selected = false
    }
}

export default SquadUnit