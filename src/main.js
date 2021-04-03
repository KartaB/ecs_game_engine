import Render from "./RenderSystem/Render.js"
import Vector2 from "./Structs/Vector2.js"
import Input from "./Input/InputManager.js"
import Ents from "./BaseClass/CBaseStaticEntity.js"
import Utils from "./Utility/Utils.js"

import Unit from "./Entities/Unit.js"

let selectedSquadID = null
export function Main()
{

}

export function Update(deltaTime)
{
    Render.DrawRect(new Vector2(0, 0), Render.GetScreenSize(), "#2e2e2e", true)

    if (Input.GetLeftClick()) {
        SquadSelectHandler()
    }

    if (Input.GetRightClick()) {
        SquadMoveHandler()
    }

    if (Input.GetKey("w") && Input.GetLeftClick()) {
        CreateSquad(5, Input.GetCursorPosition())
    }

    DrawSquadInfo()
}

function SquadMoveHandler() {
    if (selectedSquadID == null) return;

    let units = GetSquadUnits(selectedSquadID)
    for (let unit of units) {
        let randPos = Utils.RandomVectorInCircle(Input.GetCursorPosition(), 50)
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
    let height = 50
    Render.DrawText(`Squad ID: ${selectedSquadID}`, new Vector2(50, height), "lightgray", 20, "left")

    let units = Ents.FindByClass("Unit")
    for (let unitID of units) {
        let unit = Ents.FindByID(unitID)

        if (unit.GetComponent("SquadUnit").SquadID == selectedSquadID) {
            Render.DrawText(`Unit[${unit.index}]: ${unit.id}`, new Vector2(50,height+=25), "lightgray", 20, "left")
        }
    }
}