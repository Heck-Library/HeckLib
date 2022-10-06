
export function isArr (x) {
    if (Array.isArray(x)) {
        return true;
    } else return false;
}

export function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

export function toLinear (x) {
    let inputKeyframe = x;
    if (isArr(inputKeyframe)) {
        for (let i = 0; i < inputKeyframe.length; i++) {
            if (typeof inputKeyframe[i] === 'string') {
                inputKeyframe.length = (i);
            }
        }
    }
    return inputKeyframe;
}

export function vecLengthMatch (x, y) {
    if (isArr(x)) {
        if (x.length == y) { return true }
        else return false;
    } else {
        throw console.error('Input not an array at' + (new Error().stack));
    }
}

export function validTrack (x) {
    if (isArr(x) && x.length < 2) {
        throw new Error('Not enough track names in an array.\nIf you don\'t need more than one track, try making this a string instead.')
    } else if (typeof x !== 'string' && !isArr(x)) {
        throw new Error('Invalid track type.')
    }
}