import { Main, Update } from "./main.js"
import { UpdateCurTime } from "./Utility/CurTime.js"

import Entity from "./BaseClass/CBaseEntity.js"
import Input from "./Input/InputManager.js"
import Render from "./RenderSystem/Render.js"

function GameLoop()
{
    UpdateCurTime()
    Render.AdjustScreen()
    
    Update()

    for (let entID in Entity.List) {
        for (let component in Entity.List[entID].components) {
            Entity.List[entID].GetComponent(component).Update()
        }
    }

    Input.ResetInput()
}

Main()
setInterval(GameLoop, 1000/60)