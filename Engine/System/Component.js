class Component
{
	#owner = undefined;
	#initialized = false;

	constructor() {
	}

	get owner() {
		return this.getOwner()
	}

	shouldTick() {
		return true
	}

	getName() {
		return this.constructor.name
	}

	setOwner(newOwner) {
		if (newOwner !== undefined && this.#owner === undefined) {
			this.#owner = newOwner
		}
	}

	getOwner() {
		return this.#owner
	}

	initialize() {
		if (this.#initialized === false) {
			this.#initialized = true
			this.start()
		}
	}

	start() {
	}

	update() {
	}

	onDestroy() {
	}

	destroy() {
		this.#owner.removeComponent(this.getName())
	}
}

export default Component