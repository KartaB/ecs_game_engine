class RenderLineCommand
{
	/*
		! position: Vector2
		! points: Vector2[]
		
		zindex: int
		style: string
	*/

	constructor(data) {
		this.data = data
	}

	draw(ctx) {
		if (this.data.style !== undefined) {
			ctx.strokeStyle = this.data.style
		}

		ctx.beginPath()	
		ctx.moveTo(this.data.position.x, this.data.position.y)

		this.data.points.forEach(point => {
			ctx.lineTo(point.x, point.y)
		})

		ctx.closePath()
		ctx.stroke()
	}
}

export default RenderLineCommand