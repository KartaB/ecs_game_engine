class Component
{
    constructor(_name = "CBaseComponent") {
        this.name = _name
        this.owner = null

        this.Start()
    }

    Start() {}
    Update() {}
}

export default Component