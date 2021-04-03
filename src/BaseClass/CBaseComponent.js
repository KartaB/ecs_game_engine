import { CurTime } from "./../Utility/CurTime.js"

class Component
{
    #startInit = false
    
    constructor() {
        this.name = this.constructor.name
        this.owner = null

        this.nextUpdate = 0
    }

    Remove() {
        delete this.owner.components[this.name]
    }

    ComponentHandler(deltaTime) {
        if (this.#startInit == false) {
            this.Start()
            this.#startInit = true
        }

        if (CurTime() >= this.nextUpdate) {
            this.Update(deltaTime)
        }
    }

    Start() {}
    Update(deltaTime) {}
}

export default Component