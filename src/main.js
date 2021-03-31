import Input from "./Input/InputManager.js"
import Render from "./RenderSystem/Render.js"
import Player from "./Entities/Player.js"
import Vector2 from "./Structs/Vector2.js"

export function Main()
{

}

export function Update()
{
    Render.DrawRect(new Vector2(0, 0), Render.GetScreenSize(), "#2e2e2e", true)
}