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

/* Reset input */
function ResetInput() {
    leftButtonClicked = false
    rightButtonClicked = false
}

export default {
    GetKey,
    GetLeftClick,
    GetRightClick,
    ResetInput
}