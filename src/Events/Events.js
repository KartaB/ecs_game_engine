let hasResized = false

document.body.onresize = function(event) {
    hasResized = true
}

function HasResized()
{
    return hasResized
}

function ClearEvents()
{
    hasResized = false
}

export default {
    ClearEvents,

    HasResized
}