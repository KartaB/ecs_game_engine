import Utils from "./../Utility/Utils.js"
import { CurTime } from "./../Utility/CurTime.js"
import Vector2 from "../Structs/Vector2.js"

class Particle
{
    static List = []

    constructor(_lifetime = 1, _pos = new Vector2(), _scale = 20) {
        this.id = Utils.RandomID()
        this.Lifetime = CurTime() + _lifetime
        this.Scale = _scale
        this.Position = _pos

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