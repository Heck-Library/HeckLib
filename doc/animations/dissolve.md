# Dissolve

Note: Dissolve only affects the object's dissolve value, it does not affect the arrows, to change the arrows' dissolve value, use the [`dissolveArrow`](./dissolveArrow) animation.

## Explanation

The `dissolve` animation is used to change the dissolve value of an object. This animation uses the Beat Saber level failed dissolve shader. However, [Noodle Extensions](https://github.com/Aeroluna/NoodleExtensions) allows you to change the dissolve shader mid-level.

`dissolve` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `dissolve` can be either a [`vec1`](../types/vec1) or a [`vec1anim`](../types/vec1anim). If you want to assign the values, [`vec1`](../types/vec1) should be used. If you want to assign the values as an animation, [`vec1anim`](../types/vec1anim) should be used.

Dissolve can be any number between 0 and 1, where 0 is fully dissolved and 1 is fully opaque.

If both path animation `dissolve` and track animation `dissolve` are assigned to the same object, they will be multiplied together.

// TODO: Add examples