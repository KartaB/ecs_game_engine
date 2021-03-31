import Entity from "./CBaseEntity.js"

class Ents
{
    static FindByClass(_class) {
        let foundEnts = []
        for (let entID in Entity.List) {
            if (Entity.List[entID].constructor.name === _class) {
                foundEnts.push(Entity.List[entID])
            }
        }
        return foundEnts
    }
}

export default Ents