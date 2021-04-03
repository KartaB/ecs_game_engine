import Ents from "./BaseClass/CBaseStaticEntity.js"
import Button from "./BaseClass/CBaseButton.js"

import Unit from "./Entities/Unit.js"
import CursorEffect from "./Particles/CursorEffect.js"

import Render from "./RenderSystem/Render.js"
import Vector2 from "./Structs/Vector2.js"
import Input from "./Input/InputManager.js"
import Utils from "./Utility/Utils.js"

let selectedSquadID = null
let showSquadInfo = false
export function Main()
{
    let btn = new Button("+", new Vector2(30, 74))
    btn.SetWidth(18)
    btn.SetHeight(18)
    btn.OnClick = function() {
        showSquadInfo = !showSquadInfo
    }
    btn.OnHover = function() {
        btn.TextColor = "white"
        btn.BorderColor = "white"
    }
    btn.OnHoverOut = function() {
        btn.TextColor = "gray"
        btn.BorderColor = "lightgray"
    }
}

export function Update(deltaTime)
{
    Render.DrawRect(new Vector2(0, 0), Render.GetScreenSize(), "#2e2e2e", true)

    if (Input.GetLeftClick() && !Input.GetKey("w")) {
        SquadSelectHandler()
    }

    if (Input.GetRightClick()) {
        SquadMoveHandler()
    }

    if (Input.GetKey("w") && Input.GetLeftClick()) {
        CreateSquad(5, Input.GetCursorPosition())
    }

    DrawSpawnTooltip()
    DrawControlsTooltip()
    DrawSquadInfo()
}

function SquadMoveHandler() {
    if (selectedSquadID == null) return;
    let cursorPos = Input.GetCursorPosition()

    new CursorEffect(2, cursorPos, 1)

    let units = GetSquadUnits(selectedSquadID)
    for (let unit of units) {
        let randPos = Utils.RandomVectorInCircle(cursorPos, 75)
        unit.GetComponent("MoveUnit").Destination = randPos
    }
}

function SquadSelectHandler() {
    HighlightSquadUnits(selectedSquadID, false)

    let clickPos = Input.GetCursorPosition()

    let unitsList = Ents.FindByClass("Unit")
    for (let unitID of unitsList) {
        let unit = Ents.FindByID(unitID)

        let unitPos = unit.GetComponent("Transform").Position
        let unitScale = unit.GetComponent("RenderUnit").Scale

        if (Utils.Distance(clickPos, unitPos) <= unitScale) {
            selectedSquadID = unit.GetComponent("SquadUnit").SquadID

            HighlightSquadUnits(selectedSquadID, true)
            return;
        }
    }

    selectedSquadID = null
}

function GetSquadUnits(_squadID) {
    let squadUnits = []

    let units = Ents.FindByClass("Unit")
    for (let unitID of units) {
        let unit = Ents.FindByID(unitID)

        if (unit.GetComponent("SquadUnit").SquadID == selectedSquadID) {
            squadUnits.push(unit)
        }
    }

    return squadUnits
}

function HighlightSquadUnits(_squadID, _highlight) {
    if (_squadID == null) return;

    let units = GetSquadUnits(selectedSquadID)
    for (let unit of units) {
        unit.GetComponent("SquadUnit").Selected = _highlight
    }
}

function CreateSquad(_size, _pos) {
    let randSquadID = Utils.RandomID()

    for (let i = 0; i < _size; i++) {
        let unitPos = Utils.RandomVectorInCircle(_pos, 50)

        let unit = new Unit()
        unit.GetComponent("Transform").Position = unitPos
        unit.GetComponent("SquadUnit").SquadID = randSquadID
    }
}

function DrawSquadInfo() {
    let height = 80
    if (!showSquadInfo) {
        Render.DrawText("Click to show squad info", new Vector2(50, height), "gray", 20, "left")
        return
    }

    Render.DrawText(`Squad ID: ${selectedSquadID}`, new Vector2(50, height), "lightgray", 20, "left")

    let units = Ents.FindByClass("Unit")
    for (let unitID of units) {
        let unit = Ents.FindByID(unitID)

        if (unit.GetComponent("SquadUnit").SquadID == selectedSquadID) {
            Render.DrawText(`Unit[${unit.index}]: ${unit.id}`, new Vector2(50,height+=25), "lightgray", 20, "left")
        }
    }
}

function DrawSpawnTooltip() {
    let wColor = "lightgray"
    let wSize = 20

    let lClickColor = "lightgray"
    let lClickSize = 20

    if (Input.GetKey("w")) {
        wColor = "gold"
        wSize = 22

        if (Input.GetLeftClick()) {
            lClickColor = "gold"
            lClickSize = 21
        }
    }

    let height = 50
    Render.DrawText("W", new Vector2(50, height), wColor, wSize, "left")
    Render.DrawText("+", new Vector2(75, height), "lightgray", 20, "left")
    Render.DrawText("Left Click", new Vector2(95, height), lClickColor, lClickSize, "left")
    Render.DrawText("| Create new squad", new Vector2(185, height), "gray", 20, "left")
}

function DrawControlsTooltip() {
    let height = 50
    let lClickColor = "lightgray"
    let rClickColor = "lightgray"

    if (Input.GetLeftClick() && !Input.GetKey("w")) {
        lClickColor = "gold"
    }
    
    if (Input.GetRightClick()) {
        rClickColor = "gold"
    }

    let lClickStart = 425
    Render.DrawText("Left Click", new Vector2(lClickStart, height), lClickColor, 20, "left")
    Render.DrawText("| Select squad", new Vector2(lClickStart + 90, height), "gray", 20, "left")
    
    let rClickStart = 700
    Render.DrawText("Right Click", new Vector2(rClickStart, height), rClickColor, 20, "left")
    Render.DrawText("| Move selected squad", new Vector2(rClickStart + 105, height), "gray", 20, "left")
}