# Dissolve Arrow

Note: This page is about dissolve arrow animations, if you want to dissolve entire objects, refer to [this page](../animations/dissolve.md) instead.

## Explanation

The `dissolveArrow` animation is used to dissolve an arrow. This animation uses the Beat Saber level failed dissolve shader. However, [Noodle Extensions](https://github.com/Aeroluna/NoodleExtensions) allows you to change the dissolve shader mid-level

`dissolveArrow` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack.md) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation.md) event or assign it to the object itself under it's `anim` property.

The format of `dissolveArrow` can be either a [`vec1`](../types/vec1.md) or a [`vec1anim`](../types/vec1anim.md). If you want to assign the values, [`vec1`](../types/vec1.md) should be used. If you want to assign the values as an animation, [`vec1anim`](../types/vec1anim.md) should be used.

Dissolve can be any number between 0 and 1, where 0 is fully dissolved and 1 is fully opaque.

If both path animation `dissolveArrow` and track animation `dissolveArrow` are assigned to the same object, they will be multiplied together.

// TODO: Add examples