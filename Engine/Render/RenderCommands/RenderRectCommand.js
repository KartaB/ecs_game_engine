class RenderRectCommand
{
	/*
		! position: Vector2
		! length: Vector2

		zindex: int
		style: string
		fill: boolean	
	*/

	constructor(data) {
		this.data = data
	}

	draw(ctx) {
		if (this.data.fill) {
			if (this.data.style !== undefined) {
				ctx.fillStyle = this.data.style
			}

			ctx.fillRect(this.data.position.x, this.data.position.y, this.data.length.x, this.data.length.y);
		} else {
			if (this.data.style !== undefined) {
				ctx.strokeStyle = this.data.style
			}

			ctx.strokeRect(this.data.position.x, this.data.position.y, this.data.length.x, this.data.length.y);
		}
	}
}

export default RenderRectCommand