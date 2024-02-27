import Component from "../../Engine/System/Component.js"
import Vector2 from "../../Engine/Structs/Vector2.js"
import Input from "../../Engine/Input/InputManager.js"

class ParticleMove extends Component
{
	start() {
		this.defaultPos = Vector2.Copy(this.owner.transform.position)
		this.drag = 0
	}

	update(deltaTime) {
		const cursorPos = Input.getCursorPos()
		const transform = this.owner.transform

		const distance = Vector2.Distance(transform.position, cursorPos)
		const moveComponent = this.owner.getComponent("ParticleMove")
		const range = 15000

		if (distance < range) {
			const angleVec = Input.getMouseButton(0) ? transform.position.AimVector(cursorPos) : cursorPos.AimVector(transform.position)
			const distancePercent = (range - distance) / range
			const drag = (1 - moveComponent.drag)
			const speed = 7

			const offset = angleVec.Mul(distancePercent).Mul(drag).Mul(speed)

			transform.position = transform.position.Add(offset)
		}
		else {
			const defaultPos = moveComponent.defaultPos

			if (!Vector2.Equal(transform.position, defaultPos)) {
				const angleVec = transform.position.AimVector(defaultPos)
				const drag = (1 - moveComponent.drag)

				const offset = angleVec.Mul(drag).Mul(2.5)

				transform.position = transform.position.Add(offset)

				if (Vector2.Distance(transform.position, defaultPos) < offset.Magnitude()) {
					transform.position.x = defaultPos.x
					transform.position.y = defaultPos.y
				}
			}
		}
	}
}

export default ParticleMove