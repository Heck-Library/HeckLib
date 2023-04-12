# Environment
Environment enhancements are fully a chroma feature and are implemented to HeckLib, however it is an experimental feature. 

Objects can be manipulated using environment enhancements using the Environment class.
```ts
new Environment()
```
This will create a new environment enhancement object. This can be used to manipulate objects or create geometry.
> ## General properties
> These properties work on all Environment objects.
> - `.active(boolean)` Enables or disables the object.
> - `.scale(vec3)` Sets the object scale.
> - `.pos(vec3)` Sets the object position.
> - `.localPos(vec3)` Sets the object localPosition.
> - `.rot(vec3)` Sets the object rotation.
> - `.localRot(vec3)` Sets the object localRotation.
> - `.lightID(number)` Sets the object lightID.
> - `.track(string|string[])` Sets the object track.

> ## Geometry
> To make an environment object into a geometry object, just simply add the property `geometry()`. That turns the environment object into a geometry shape.<br>Example:
> ```ts
> new Environment
>      .geometry()
>      .push();
> ```
> This just makes a simple geometry object.<br><br>To edit the values we can add a few properties to it
>> ### Supported properties 
>> - `.shape(string|geoShape)` Sets the shape of the object. All properties <a href="https://github.com/Heck-Library/HeckLib/blob/main/doc/properties.md#geometry-properties">here</a>.
>> - `.material(string|material)` Sets the shape of the object.
>> - `.collision(boolean)` Turns on collider hitbox for the object.
> ## Materials
> Materials should be created so that you can reuse them for other objects. This will also significantly increase the performance of the map. Less materials means less lag, reuse materials if possible.<br>The syntax for materials is
> ```ts
> new Material("name")
>       .color([1, 1, 1])
>       .shader(Shader.TransparentLight)
>       .track("materialTrack")
>       .push();
> ```
> This would create a new reusable material that can be called with `"name"` in all geometry objects. An example of this would be
> ```ts
> new Material("name")
>       .color([1, 1, 1])
>       .shader(Shader.TransparentLight)
>       .push();
>
> new Environment
>       .geometry()
>       .shape(Shape.Cube)
>       .material("name")
>       .push();
> ```
>> ### Supported properties
>> - `.color(vec3)` Sets the material's initial color.
>> - `.shader(shaderType)` Sets the shader for the material. All shaders <a href="https://github.com/Heck-Library/HeckLib/blob/main/doc/properties.md#shader-properties">here</a>.
>> - `.track(string|string[])` Sets the material's track(s). This can be used to control the material color later.
>> - `.keywords(array)` Sets the shader's properties.

> ## Environment editing
> This is a bit more complicated subject. This page contains a simple explanation of it.
> ```ts
> new Environment
>       .contains("PS")
>       .active(false)
> ```
> This would essentially just disable all environment objects that have `PS` in their name.
>> ### Supported properties
>> - `.regex(string|RegExp)` Regex search using the ID.
>> - `.contains(string)` Contains search using the ID.
>> - `.exact(string)` Exact search using the ID.