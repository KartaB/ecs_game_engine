import Transform from "./../Components/Transform.js"
import Utils from "./../Utility/Utils.js"

class Entity
{
    static List = []

    constructor() {
        this.id = Utils.RandomID()
        this.components = []

        this.AddComponent(new Transform())

        Entity.List[this.id] = this
    }

    AddComponent(_component) {
        _component.owner = this
        this.components[_component.name] = _component
    }

    RemoveComponent(_componentName) {
        delete this.components[_componentName]
    }

    GetComponent(_componentName) {
        return this.components[_componentName]
    }

    Remove() {
        for (let compName in this.components) {
            delete this.components[compName]
        }

        delete Entity.List[this.id]
    }
}

export default Entity