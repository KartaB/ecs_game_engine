import Vector2 from "./../Structs/Vector2.js"

/* Keyboard buttons */
let pressedKeys = []

document.onkeypress = function(event) {
    let keyLower = event.key.toLowerCase()
    pressedKeys[keyLower] = true

    pressedKeys["ctrl"] = event.ctrlKey
}

document.onkeyup = function(event)
{
    let key = event.key.toLowerCase()
    pressedKeys[key] = false

    pressedKeys["ctrl"] = event.ctrlKey
}

function GetKey(key) {
    let keyLower = key.toLowerCase()
    return pressedKeys[keyLower]
}

/* Mouse buttons */
let leftButtonClicked = false
document.onclick = function(event) {
    leftButtonClicked = true

    pressedKeys["ctrl"] = event.ctrlKey
}

let rightButtonClicked = false
document.oncontextmenu = function(event) {
    event.preventDefault()
    rightButtonClicked = true

    pressedKeys["ctrl"] = event.ctrlKey
}

function GetLeftClick() {
    return leftButtonClicked
}

function GetRightClick() {
    return rightButtonClicked
}

/* Double click */
let doubleClick = false
document.ondblclick = function(event) {
    doubleClick = true
}

function GetDoubleClick() {
    return doubleClick
}

/* Mouse button click & hold */
let leftClickDown = false
document.onmousedown = function(event) {
    leftClickDown = true
}

document.onmouseup = function(event) {
    leftClickDown = false
}

function GetLeftClickDown()
{
    return leftClickDown
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

function ResetDoubleClick() {
    doubleClick = false
}

/* Reset input */
function ClearInput() {
    ResetLeftClick()
    ResetRightClick()
    ResetDoubleClick()
}

export default {
    GetKey,
    GetLeftClick,
    GetRightClick,
    GetDoubleClick,
    GetLeftClickDown,
    
    GetCursorPosition,

    ResetLeftClick,
    ResetRightClick,
    ClearInput,
}