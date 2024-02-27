const instance = {
	start: undefined,
	update: undefined,
}

async function tryLoadGameInstance() {
	const scriptElem = document.querySelector("script[gameinstance]")

	if (scriptElem === null) return false

	const module = await import(`/${scriptElem.getAttribute("gameinstance")}`)

	instance.start = module.start
	instance.update = module.update

	if (instance.start !== undefined) {
		instance.start()
	}

	return true
}

export default {
	instance,
	tryLoadGameInstance
}