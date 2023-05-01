# Builders
This page covers builders and their usage.

## Usage
> Builders are essentially used to create new objects with methods instead of JSON objects. Using builders is the old syntax of HeckLib readded as a namespace. It's all about your personal preference of how you prefer to do everything, there are no snippets for builders but it does have autocomplete.
> 
> To use builders, you have to import the `Builder` module with
> ```ts
> import { Builder } from 'src/main.ts';
> ```
> Since all the methods for builders can be found by using autocomplete, I won't be listing them all here.
> 
> For this example, I'm gonna use an `AnimateTrack` builder.
> ```ts
> new Builder.AnimateTrack(time)
> ```
> This will call the builder class of `AnimateTrack`. You can also call the properties by just simply using the `.` symbol, this will bring up a list of all properties possible to use for a builder.
> 
> Example:
> ```ts
> new Builder.AnimateTrack(4)
>     .track("foo")
>     .duration(1)
>     .scale([
>         [2, 2, 2, 0],
>         [1, 1, 1, 1]
>     ])
>     .push();
> ```
> By calling push, the builder will push the object straight to the file.
> 
> Builders are generally considered low priority when it comes to support for new stuff. Therefore, it is recommended to use the normal ways of creating new objects. Such as snippets.