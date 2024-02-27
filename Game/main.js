import Entity from "./../Engine/System/Entity.js"
import Input from "./../Engine/Input/InputManager.js"
import Render from "./../Engine/Render/Render.js"
import Vector2 from "../Engine/Structs/Vector2.js"
import Color from "../Engine/Structs/Color.js"
import Utils from "../Engine/Utility/Utils.js"

import ParticleMove from "./Components/ParticleMove.js"
import ParticleRender from "./Components/ParticleRender.js"

const particleList = []
const connections = []

const minDistance = 10
const maxDistance = 150

export function start()
{
	const width = Render.getScreenSize().x;
    for (let i = 0; i < Math.min(400, width / 6); i++) {
        const pos = Utils.RandomVector(new Vector2(), Render.getScreenSize())

		const particle = new Entity("particle")
		particle.addComponent(new ParticleMove())
		particle.addComponent(new ParticleRender())

		particle.transform.position = pos

        particleList.push(particle)
    }

	for (const particle of particleList) {
		for (const other of particleList) {
			if (particle === other) continue

			const min = Math.min(particle.getIndex(), other.getIndex())
			const max = Math.max(particle.getIndex(), other.getIndex())

			const hash = `${min}_${max}`
			if (connections[hash] === undefined) {
				connections[hash] = { p1: particle, p2: other }
			}
		}
	}
}

let frames = 0
export function update(deltaTime)
{
	for (const index in connections) {
		const { p1, p2, dist } = connections[index]

		let distance
		if (frames % 2 == 0) {
			distance = Vector2.DistanceManhattan(p1.transform.position, p2.transform.position)
			connections[index].dist = distance
		} else {
			distance = dist
		}
		
		if (distance >= minDistance && distance <= maxDistance) {
			const alpha = (maxDistance - distance) / maxDistance

			const color1 = Color.hslToRgb(p1.getComponent("ParticleRender").color)
			const color2 = Color.hslToRgb(p2.getComponent("ParticleRender").color)
			
			const middleColor = getMiddleColor(color1, color2)
			middleColor.Alpha = alpha

			Render.drawLine({
				position: p1.transform.position,
				points: [ p2.transform.position ],
				style: middleColor.toString()
			})
		}
	}

	frames++
}

function getMiddleColor(color1, color2) {
	const middleR = Math.round((color1.R + color2.R) / 2);
	const middleG = Math.round((color1.G + color2.G) / 2);
	const middleB = Math.round((color1.B + color2.B) / 2);

	return new Color(middleR, middleG, middleB);
}