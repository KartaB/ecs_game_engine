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