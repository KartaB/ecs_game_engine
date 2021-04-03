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