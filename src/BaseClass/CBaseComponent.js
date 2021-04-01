class Component
{
    constructor(_name = "CBaseComponent") {
        this.name = _name
        this.owner = null

        this.Start()
    }

    Remove() {
        delete this.owner.components[this.name]
    }

    Start() {}
    Update() {}
}

export default Component