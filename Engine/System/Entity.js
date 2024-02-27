import EntityComponent from "./EntityComponent.js";
import Transform from "../Components/Transform.js";

class Entity
{
	static #next_index = 0;

	#classname = "entity"
	#valid = true
	#internal_index = undefined;

	constructor(classname) {
		this.#classname = classname
		this.#internal_index = Entity.#next_index++
		this.addComponent(new Transform())
	}

	get transform() {
		return this.getComponent("transform")
	}

	getClass() {
		return this.#classname
	}

	getIndex() {
		return this.#internal_index		
	}

	isValid() {
		return this.#valid
	}

	remove() {
		if (!this.isValid()) throw "Entity is not valid"

		this.#valid = false
		EntityComponent.removeEntity(this)
	}

	getComponent(componentName) {
		if (!this.isValid()) throw "Entity is not valid"

		return EntityComponent.getComponent(this, componentName)
	}

	addComponent(component) {
		if (!this.isValid()) throw "Entity is not valid"

		EntityComponent.addComponent(this, component)
	}

	removeComponent(componentName) {
		if (!this.isValid()) throw "Entity is not valid"

		EntityComponent.removeComponent(this, componentName)
	}

	hasComponent(componentName) {
		if (!this.isValid()) throw "Entity is not valid"

		return EntityComponent.hasComponent(this, componentName)
	}
}

export default Entity