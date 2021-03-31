import Render from "./RenderSystem/Render.js"
import Player from "./Entities/Player.js"
import Vector2 from "./Structs/Vector2.js"

export function Main()
{
    let ply = new Player()
    ply.GetComponent("Position").Position = new Vector2(500, 500)
}

export function Update()
{
    Render.DrawRect(new Vector2(0, 0), Render.GetScreenSize(), "#2e2e2e", true)
}