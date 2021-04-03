import Entity from "./../BaseClass/CBaseEntity.js"

import MoveBullet from "./../Components/BulletComponents/MoveBullet.js"
import CollisionBullet from "./../Components/BulletComponents/CollisionBullet.js"
import RenderBullet from "./../Components/BulletComponents/RenderBullet.js"
import LifetimeBullet from "./../Components/BulletComponents/LifetimeBullet.js"

import Vector2 from "../Structs/Vector2.js"

class Bullet extends Entity
{
    constructor(_pos, _dir) {
        super()

        this.AddComponent(new MoveBullet())
        this.AddComponent(new CollisionBullet())
        this.AddComponent(new LifetimeBullet())
        this.AddComponent(new RenderBullet())

        this.GetComponent("Transform").Position = Vector2.Copy(_pos)
        this.GetComponent("MoveBullet").Direction = Vector2.Copy(_dir)

        this.ownerID = null
        this.ignoredSquadID = null
    }
}

export default Bullet