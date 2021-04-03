import Utils from "./../Utility/Utils.js"
import { CurTime } from "./../Utility/CurTime.js"

class Particle
{
    static List = []

    constructor(_lifetime) {
        this.id = Utils.RandomID()
        this.Lifetime = CurTime() + _lifetime

        Particle.List[this.id] = this

        this.Start()
    }

    ParticleTick() {
        this.Update()

        if (CurTime() > this.Lifetime) {
            this.Remove()
        }
    }

    Start() {}
    Update() {}

    Remove() {
        delete Particle.List[this.id]
    }
}

export default Particle