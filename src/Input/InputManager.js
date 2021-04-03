import Vector2 from "./../Structs/Vector2.js"

/* Keyboard buttons */
let pressedKeys = []

document.onkeypress = function(event) {
    let keyLower = event.key.toLowerCase()
    pressedKeys[keyLower] = true
}

document.onkeyup = function(event)
{
    let key = event.key.toLowerCase()
    pressedKeys[key] = false
}

function GetKey(key) {
    let keyLower = key.toLowerCase()
    return pressedKeys[keyLower]
}

/* Mouse buttons */
let leftButtonClicked = false
document.onclick = function() {
    leftButtonClicked = true
}

let rightButtonClicked = false
document.oncontextmenu = function(event) {
    event.preventDefault()
    rightButtonClicked = true
}

function GetLeftClick() {
    return leftButtonClicked
}

function GetRightClick() {
    return rightButtonClicked
}

/* Cursor position */
let mouseX = 0, mouseY = 0
document.onmousemove = function(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

function GetCursorPosition() {
    return new Vector2(mouseX, mouseY)
}

function ResetLeftClick() {
    leftButtonClicked = false
}

function ResetRightClick() {
    rightButtonClicked = false
}

/* Reset input */
function ResetInput() {
    ResetLeftClick()
    ResetRightClick()
}

export default {
    GetKey,
    GetLeftClick,
    GetRightClick,
    GetCursorPosition,

    ResetLeftClick,
    ResetRightClick,
    ResetInput,
}