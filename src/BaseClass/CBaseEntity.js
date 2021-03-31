import Position from "./../Components/Position.js"

class Entity
{
    static List = []

    constructor() {
        this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)
        this.components = []

        this.AddComponent(new Position())

        Entity.List[this.id] = this
    }

    AddComponent(_component) {
        this.components[_component.name] = _component
    }

    RemoveComponent(_componentName) {
        delete this.components[_componentName]
    }

    GetComponent(_componentName) {
        return this.components[_componentName]
    }

    Remove() {
        delete Entity.List[this.id]
    }
}

export default Entity