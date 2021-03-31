/* Keyboard buttons */
let pressedKeys = []

document.onkeypress = function(event) {
    let keyLower = event.key.toLowerCase()
    pressedKeys[keyLower] = true
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
    pressedKeys = []

    leftButtonClicked = false
    rightButtonClicked = false
}

export default {
    GetKey,
    GetLeftClick,
    GetRightClick,
    ResetInput
}