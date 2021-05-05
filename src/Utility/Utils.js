import Vector2 from "./../Structs/Vector2.js"

function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function RandomFloat(min, max)
{
    return (Math.random() * (min - max) + max).toFixed(4)
}

function RandomVector(_vec1, _vec2)
{
    let randX = RandomInt(_vec1.x, _vec2.x)
    let randY = RandomInt(_vec1.y, _vec2.y)

    return new Vector2(randX, randY)
}

function RandomVectorInCircle(_start, _radius)
{
    let angle = Math.random() * Math.PI * 2;
    let x = Math.cos(angle) * RandomFloat(1, _radius);
    let y = Math.sin(angle) * RandomFloat(1, _radius);

    return new Vector2(_start.x + x, _start.y + y)
}

function RandomID()
{
    return (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)
}

function Distance(_point1, _point2)
{
    let a = _point1.x - _point2.x;
    let b = _point1.y - _point2.y;

    return Math.sqrt( a*a + b*b );
}

function IsVectorInBox(_vec, _boxStart, _boxEnd) {
    if (_vec.x >= _boxStart.x && _vec.x <= _boxEnd.x) {
        if (_vec.y >= _boxStart.y && _vec.y <= _boxEnd.y) {
            return true
        }
    }

    return false
}

function CopyStringToClipboard(_str) {
    let dummy = document.createElement('textarea')
    dummy.value = _str
    dummy.setAttribute('readonly', '')
    dummy.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(dummy)
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
 }

export default {
    RandomInt,
    RandomFloat,
    RandomVector,
    RandomVectorInCircle,
    RandomID,
    
    Distance,
    IsVectorInBox,
    CopyStringToClipboard,
}