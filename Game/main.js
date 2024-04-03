import Entity from "./../Engine/System/Entity.js"
import Input from "./../Engine/Input/InputManager.js"
import Render from "./../Engine/Render/Render.js"
import Vector2 from "../Engine/Structs/Vector2.js"
import Color from "../Engine/Structs/Color.js"
import Utils from "../Engine/Utility/Utils.js"
import SpatialHashGrid from "./Systems/SpatialHashGrid.js"

import ParticleMove from "./Components/ParticleMove.js"
import ParticleRender from "./Components/ParticleRender.js"

const particleList = []
const connections = []

const minDistance = 32
const maxDistance = 120

let ctx
let grid

export function start()
{
	ctx = Render.getContext()

	const cellSize = 32
	const width = Render.getScreenSize().x;
	const height = Render.getScreenSize().y;

	SpatialHashGrid.Global = new SpatialHashGrid(cellSize, Math.floor(width / cellSize) + 1, Math.floor(height / cellSize) + 1)
	grid = SpatialHashGrid.Global

    for (let i = 0; i < Math.min(600, width / 4); i++) {
        const pos = Utils.RandomVector(new Vector2(), Render.getScreenSize())

		const particle = new Entity("particle")
		particle.addComponent(new ParticleMove())
		particle.addComponent(new ParticleRender())

		particle.transform.position = pos

        particleList.push(particle)
    }

	for (const particle of particleList) {
		for (const other of particleList) {
			if (particle === other) continue

			const min = Math.min(particle.getIndex(), other.getIndex())
			const max = Math.max(particle.getIndex(), other.getIndex())

			const hash = `${min}_${max}`
			if (connections[hash] === undefined) {
				connections[hash] = { p1: particle, p2: other, frame: -1}
			}
		}
	}

	grid.build(particleList)
}

let frame = 0
export function update(deltaTime)
{
	//debug()
	
	for (const p of particleList)
	{
		const cell = grid.getCell(p.transform.position.x, p.transform.position.y)
		if (cell)
		{
			const neighbourCells = grid.getCellsInRadius(cell.x, cell.y, 3)
			for (const c of neighbourCells)
			{
				if (c == cell) continue // skip current cell

				for (const o of c.objects)
				{
					const min = Math.min(p.getIndex(), o.getIndex())
					const max = Math.max(p.getIndex(), o.getIndex())
					const hash = `${min}_${max}`
					const conn = connections[hash]

					if (conn.frame >= frame) continue
					conn.frame = frame

					const distance = Vector2.DistanceManhattan(p.transform.position, o.transform.position)
		
					if (distance >= minDistance && distance <= maxDistance) {
						const alpha = (maxDistance - distance) / maxDistance

						ctx.strokeStyle = `${p.getComponent("ParticleRender").colorTemplate}${alpha}`
						ctx.beginPath()
						ctx.moveTo(p.transform.position.x, p.transform.position.y)			
						ctx.lineTo(o.transform.position.x, o.transform.position.y)			
						ctx.closePath()
						ctx.stroke()
					}
				}
			}	
		}
	}

	frame++
}

function debug()
{
	grid.draw()

	const currentCell = grid.getCell(particleList[0].transform.position.x, particleList[0].transform.position.y)
	if (currentCell) {
		const cells = grid.getCellsInRadius(currentCell.x, currentCell.y, 3)
		
		for (const c of cells) {	
			if (c == currentCell) continue
			Render.drawRect({
				position: new Vector2(grid.cellSize * c.x, grid.cellSize * c.y),
				length: new Vector2(grid.cellSize, grid.cellSize),
				style: "rgba(255, 0, 0, 1)",
			})
		}

		Render.drawRect({
			position: new Vector2(grid.cellSize * currentCell.x, grid.cellSize * currentCell.y),
			length: new Vector2(grid.cellSize, grid.cellSize),
			style: "rgba(255, 255, 255, 1)",
		})
	}
}

function getMiddleColor(color1, color2) {
	const middleR = Math.round((color1.R + color2.R) / 2);
	const middleG = Math.round((color1.G + color2.G) / 2);
	const middleB = Math.round((color1.B + color2.B) / 2);

	return new Color(middleR, middleG, middleB);
}