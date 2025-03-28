type XYZ = "x" | "y" | "z";
export type XYZAccessor = 
    | ""
    | XYZ
    | `${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}`
    | `${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}${XYZ}`;

type XYZW = "x" | "y" | "z" | "w";
export type XYZWAccessor = 
    | ""
    | XYZW
    | `${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}`
    | `${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}${XYZW}`;

type X = "x";
export type XAccessor =
    | "" 
    | X 
    | `${X}${X}`
    | `${X}${X}${X}`
    | `${X}${X}${X}${X}`
    | `${X}${X}${X}${X}${X}`
    | `${X}${X}${X}${X}${X}${X}`
    | `${X}${X}${X}${X}${X}${X}${X}`
    | `${X}${X}${X}${X}${X}${X}${X}${X}`;