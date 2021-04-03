import Entity from "./CBaseEntity.js"

class Ents
{
    static FindByClass(_class) {
        let foundEnts = []
        for (let entID in Entity.ClassList[_class]) {
            foundEnts.push(Entity.ClassList[_class][entID])
        }
        return foundEnts
    }

    static FindByID(_id) {
        return Entity.List[_id]
    }

    static GetAll() {
        return Entity.List
    }
}

export default Ents