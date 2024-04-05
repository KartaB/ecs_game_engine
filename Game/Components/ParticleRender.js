import Component from "../../Engine/System/Component.js"
import Render from "../../Engine/Render/Render.js"
import Mathf from "../../Engine/Utility/Mathf.js"

class ParticleRender extends Component
{
    start()
    { 
        this.color = this.getColor()
    }

    update()
    {
        this.color = this.getColor()
		
		Render.drawCircle({
			position: this.owner.transform.position,
			radius: 3,
			style: this.color,
			fill: true
		})
    }

    getColor() {
        const percHsv = this.owner.transform.position.x / Render.getScreenSize().x
        const hue = Mathf.Clamp(Math.floor(percHsv * 360), 0, 360)

		this.colorTemplate = `hsla(${hue}, 100%, 50%, `

        return `${this.colorTemplate}1)`
    }
}

export default ParticleRender