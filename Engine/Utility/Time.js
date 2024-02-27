let globalStart = new Date().getTime()
let curTime = 0

function CurTime()
{
    let difference = new Date().getTime() - globalStart
    curTime = difference / 1000

	return curTime
}

let lastUpdate = Date.now();
function DeltaTime()
{
    let now = Date.now();
    let deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;

    return deltaTime
}

export {
    CurTime,
	DeltaTime
}