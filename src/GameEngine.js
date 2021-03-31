import { Main, Update } from "./main.js"

import Input from "./Input/InputManager.js"

function GameLoop()
{
    Update()

    Input.ResetInput()
}

Main()
setInterval(GameLoop, 1000/60)