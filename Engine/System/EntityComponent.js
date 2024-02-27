class EntityComponent
{
	static Components = []
	static EntitiesToRemove = []

	static update(deltaTime) {
		for (let name in EntityComponent.Components) {
			EntityComponent.Components[name].forEach(instance => {
				if (!instance.getOwner().isValid()) return

				instance.initialize()
				
				if (instance.shouldTick()) {
					instance.update(deltaTime)
				}
			})
		}

		EntityComponent.EntitiesToRemove.forEach(ent => {
			const index = ent.getIndex()

			for (let name in EntityComponent.Components) {
				if (EntityComponent.Components[name][index] !== undefined) {
					EntityComponent.Components[name][index].onDestroy()
					delete EntityComponent.Components[name][index]
				}
			}
		})

		EntityComponent.EntitiesToRemove.length = 0
	}

	static removeEntity(entity) {
		EntityComponent.EntitiesToRemove.push(entity)
	}

	static getComponent(owner, componentName) {
		const name = componentName.toLowerCase()

		if (EntityComponent.Components[name] !== undefined) {
			return EntityComponent.Components[name][owner.getIndex()]
		}

		return undefined
	}

	static addComponent(owner, component) {
		const componentName = component.getName().toLowerCase()

		if (EntityComponent.Components[componentName] === undefined) {
			EntityComponent.Components[componentName] = []
		}

		EntityComponent.Components[componentName][owner.getIndex()] = component
		component.setOwner(owner)
	}

	static removeComponent(owner, componentName) {
		const name = componentName.toLowerCase()
		const index = owner.getIndex()

		if (EntityComponent.Components[name] !== undefined && EntityComponent.Components[name][index] !== undefined) {
			EntityComponent.Components[name][index].onDestroy()
			delete EntityComponent.Components[name][index]
		}
	}

	static hasComponent(owner, componentName) {
		const name = componentName.toLowerCase()

		return EntityComponent.Components[name] !== undefined && EntityComponent.Components[name][owner.getIndex()] !== undefined
	}
}

export default EntityComponent