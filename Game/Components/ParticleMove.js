import Component from "../../Engine/System/Component.js"
import Vector2 from "../../Engine/Structs/Vector2.js"
import Input from "../../Engine/Input/InputManager.js"

import SpatialHashGrid from "../Systems/SpatialHashGrid.js"

class ParticleMove extends Component
{
	start() {
		this.defaultPos = Vector2.Copy(this.owner.transform.position)
		this.particleMove = this.owner.getComponent("ParticleMove")
	}

	update(deltaTime) {
		const cursorPos = Input.getCursorPos()
		const transform = this.owner.transform

		const distance = Vector2.Distance(transform.position, cursorPos)
		const range = 15000

		if (distance < range)
		{
			const angleVec = Input.getMouseButton(0) ? transform.position.AimVector(cursorPos) : cursorPos.AimVector(transform.position)
			const distancePercent = (range - distance) / range
			const speed = 7

			const offset = angleVec.Mul(distancePercent).Mul(speed)
			transform.position = transform.position.Add(offset.Mul(50 * deltaTime))

			SpatialHashGrid.Global.update(this.owner)
		}
		else
		{
			const defaultPos = this.particleMove.defaultPos

			if (!Vector2.Equal(transform.position, defaultPos)) {
				const angleVec = transform.position.AimVector(defaultPos)
				const offset = angleVec.Mul(2.5).Mul(50 * deltaTime)

				if (Vector2.DistanceSqrt(transform.position, defaultPos) < offset.Magnitude()) {
					transform.position.x = defaultPos.x
					transform.position.y = defaultPos.y
				} else {
					transform.position = transform.position.Add(offset)
				}

				SpatialHashGrid.Global.update(this.owner)
			}
		}
	}
}

export default ParticleMove