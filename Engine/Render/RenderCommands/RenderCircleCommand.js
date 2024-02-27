class RenderCircleCommand
{
	/*
		! start: Vector2
		! radius: float

		zindex: int
		style: string
		fill: boolean	
	*/

	constructor(data) {
		this.data = data
	}

	draw(ctx) {
		ctx.beginPath()	
		ctx.arc(this.data.position.x, this.data.position.y, this.data.radius, 0, 2 * Math.PI)

		if (this.data.fill === true) {
			if (this.data.style !== undefined) {
				ctx.fillStyle = this.data.style
			}

			ctx.fill()
		} else {
			if (this.data.style !== undefined) {
				ctx.strokeStyle = this.data.style
			}

			ctx.stroke()
		}

		ctx.closePath()
	}
}

export default RenderCircleCommand