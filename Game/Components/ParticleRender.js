import Component from "../../Engine/System/Component.js"
import Render from "../../Engine/Render/Render.js"
import Mathf from "../../Engine/Utility/Mathf.js"

class ParticleRender extends Component
{
    start()
    { 
		this.radius = 3
        this.maxLineDist = 150

        this.color = this.getColor()
    }

    update()
    {
        this.color = this.getColor()
		
		Render.drawCircle({
			position: this.owner.transform.position,
			radius: this.radius,
			style: this.color,
			fill: true
		})
    }

    getColor() {
        const percHsv = this.owner.transform.position.x / Render.getScreenSize().x
        const hue = Mathf.Clamp(Math.floor(percHsv * 360), 0, 360)

        return `hsl(${hue}, 100%, 50%)`
    }
}

export default ParticleRender