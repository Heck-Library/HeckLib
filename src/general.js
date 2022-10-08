
export function isArr (x) {
    if (Array.isArray(x)) {
        return true;
    } else return false;
}

export function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    return [r, g, b];
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