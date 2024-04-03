import Render from "../../Engine/Render/Render.js"
import Vector2 from "../../Engine/Structs/Vector2.js"

class Cell
{
	static Global

	constructor(x, y)
	{
		this.x = x
		this.y = y
		this.objects = []
	}
}

class SpatialHashGrid
{
	constructor(cellSize, numX, numY)
	{
		this.cellSize = cellSize
		this.numX = numX
		this.numY = numY

		this.cells = []

		for (let y = 0; y < this.numY; y++)
		{
			this.cells[y] = []
			for (let x = 0; x < this.numX; x++)
			{
				this.cells[y][x] = new Cell(x, y)
			}
		}
	}

	getCell(x, y)
	{
		if (x < 0 || y < 0) return undefined

		const cellX = Math.floor(x / this.cellSize)
		const cellY = Math.floor(y / this.cellSize)

		if (cellX >= this.numX) return undefined
		if (cellY >= this.numY) return undefined

		return this.cells[cellY][cellX]
	}

	getCellsInRadius(cellX, cellY, radius)
	{
		const cells = []

		for (let y = cellY - radius; y <= cellY + radius; y++)
		{
			if (y < 0 || y >= this.numY) continue;

			for (let x = cellX - radius; x <= cellX + radius; x++)
			{
				if (x < 0 || x >= this.numX) continue;

				cells.push(this.cells[y][x])
			}
		}

		return cells
	}

	build(data)
	{
		for (const obj of data)
		{
			const pos = obj.transform.position

			const cell = this.getCell(pos.x, pos.y)
			if (cell)
			{
				cell.objects.push(obj)
				obj.cell = cell
			}
		}
	}

	update(ent)
	{
		const currentCell = ent.cell
		if (!currentCell) return // outside the grid

		const pos = ent.transform.position

		const newCell = this.getCell(pos.x, pos.y)
		if (currentCell == newCell) return // no changes

		if (newCell)
		{
			const index = currentCell.objects.indexOf(ent)
			if (index != -1) {
				currentCell.objects.splice(index, 1) // unlink entity from it's current cell
			}
			
			newCell.objects.push(ent) // link entity
			ent.cell = newCell
		}
	}

	draw()
	{
		for (let y = 0; y < this.numY; y++)
		{
			for (let x = 0; x < this.numX; x++)
			{
				Render.drawRect({
					position: new Vector2(this.cellSize * x, this.cellSize * y),
					length: new Vector2(this.cellSize, this.cellSize),
					style: "rgba(255, 255, 255, 0.1)",
				})

				Render.drawText({
					position: new Vector2(this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2),
					text: `${x}.${y}`,
					font: `${this.cellSize * 0.25}px Arial`,
					align: "center",
					fill: true,
					style: "rgba(255, 255, 255, 0.1)"
				})
			}
		}
	}
}

export default SpatialHashGrid