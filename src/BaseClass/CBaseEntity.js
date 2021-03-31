import Transform from "./../Components/Transform.js"

class Entity
{
    static List = []

    constructor() {
        this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)
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
        this.components = []
        delete Entity.List[this.id]
    }
}

export default Entity