let globalStart = new Date().getTime()
let curTime = 0

function UpdateCurTime()
{
    let difference = new Date().getTime() - globalStart
    curTime = difference / 1000
}

function CurTime()
{
    return curTime
}

/* Delta Time */
let lastUpdate = Date.now();

function DeltaTime()
{
    let now = Date.now();
    let deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;

    return deltaTime
}

/* Frame Count */

let frameCount = 0

function AddFrame() {
    frameCount++
}

function GetFrameCount()
{
    return frameCount
}

export {
    UpdateCurTime,
    CurTime,
    DeltaTime,
    AddFrame,
    GetFrameCount
}