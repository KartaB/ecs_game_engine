import Vector2 from "../../Structs/Vector2.js"

class RenderImageCommand
{
	/*
		! image: Image
		! position: Vector2
		
		zindex: int
		dimensions: Vector2
		scale: float	
	*/

	constructor(data) {
		this.data = data
	}

	draw(ctx) {
		const dimensions = (this.data.dimensions || new Vector2(this.data.image.width, this.data.image.height)).Mul(this.data.scale || 1)
    	ctx.drawImage(this.data.image, this.data.position.x, this.data.position.y, dimensions.x, dimensions.y)
	}
}

export default RenderImageCommand