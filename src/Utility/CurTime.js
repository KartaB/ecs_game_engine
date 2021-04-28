let globalStart = new Date().getTime()
let curTime = 0

export function UpdateCurTime()
{
    let difference = new Date().getTime() - globalStart
    curTime = difference / 1000
}

export function CurTime()
{
    return curTime
}

var lastUpdate = Date.now();

export function DeltaTime()
{
    let now = Date.now();
    let deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;

    return deltaTime
}

/* FPS Counter */
let nextFpsCheck = CurTime() + 1
let renderedFramesCount = 0
let framesPerSecond = 0

export function SetRenderedFramesCount(value)
{
    renderedFramesCount = value
}

export function GetRenderedFramesCount()
{
    return renderedFramesCount
}

export function GetNextFpsCheck()
{
    return nextFpsCheck
}

export function SetNextFpsCheck(next)
{
    nextFpsCheck = next
}

export function SetFpsCount(fpsCount)
{
    framesPerSecond = fpsCount
    renderedFramesCount = 0
}

export function GetFPS()
{
    return framesPerSecond
}