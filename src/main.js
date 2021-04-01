import Render from "./RenderSystem/Render.js"
import Vector2 from "./Structs/Vector2.js"
import Input from "./Input/InputManager.js"
import Ents from "./BaseClass/CBaseStaticEntity.js"
import Utils from "./Utility/Utils.js"

import Unit from "./Entities/Unit.js"

let selectedSquadID = null
export function Main()
{
    CreateSquad(3, new Vector2(200, 200))
    CreateSquad(2, new Vector2(1000, 600))
}

export function Update()
{
    Render.DrawRect(new Vector2(0, 0), Render.GetScreenSize(), "#2e2e2e", true)

    if (Input.GetLeftClick()) {
        SquadSelectHandler()
    }

    if (Input.GetRightClick()) {
        SquadMoveHandler()
    }

    DrawSquadInfo()
}

function SquadMoveHandler() {
    if (selectedSquadID == null) return;

    for (let unit of GetSquadUnits(selectedSquadID)) {
        let randPos = Utils.RandomVectorInCircle(Input.GetCursorPosition(), 50)
        unit.GetComponent("MoveUnit").Destination = randPos
    }
}

function SquadSelectHandler() {
    HighlightSquadUnits(selectedSquadID, false)

    let clickPos = Input.GetCursorPosition()

    for (let unit of Ents.FindByClass("Unit")) {
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

    for (let unit of Ents.FindByClass("Unit")) {
        if (unit.GetComponent("SquadUnit").SquadID == selectedSquadID) {
            squadUnits.push(unit)
        }
    }

    return squadUnits
}

function HighlightSquadUnits(_squadID, _highlight) {
    if (_squadID == null) return;

    for (let unit of GetSquadUnits(selectedSquadID)) {
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
    let height = 50
    Render.DrawText(`Squad ID: ${selectedSquadID}`, new Vector2(50, height), "lightgray", 20, "left")

    let index = 0
    for (let unit of Ents.FindByClass("Unit")) {
        if (unit.GetComponent("SquadUnit").SquadID == selectedSquadID) {
            Render.DrawText(`Unit[${index++}]: ${unit.id}`, new Vector2(50,height+=25), "lightgray", 20, "left")
        }
    }
}