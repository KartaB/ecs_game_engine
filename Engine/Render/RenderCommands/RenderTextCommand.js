class RenderTextCommand
{
	/*
		! position: Vector2
		! text: string

		zindex: int
		style: string
		fill: boolean

		align: string
		font: string
	*/

	constructor(data) {
		this.data = data
	}

	draw(ctx) {
		if (this.data.font !== undefined) {
			ctx.font = this.data.font
		}

		if (this.data.align !== undefined) {
			ctx.textAlign = this.data.align
		}

		if (this.data.fill) {
			if (this.data.style !== undefined) {
				ctx.fillStyle = this.data.style
			}

			ctx.fillText(this.data.text, this.data.position.x, this.data.position.y)
		} else {
			if (this.data.style !== undefined) {
				ctx.strokeStyle = this.data.style
			}

			ctx.strokeText(this.data.text, this.data.position.x, this.data.position.y)
		}
	}
}

export default RenderTextCommand