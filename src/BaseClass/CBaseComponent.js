class Component
{
    constructor(_name = "CBaseComponent") {
        this.name = _name

        this.Start()
    }

    Start() {}
    Update() {}
}

export default Component