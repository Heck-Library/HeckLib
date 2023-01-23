bl_info = {
    "name": "HeckLib object exporter",
    "author": "Jevk",
    "description": "Exports objects in JSON format to use with HeckLib",
    "blender": (2,6,8),
    "version": (1, 0),
    "location": "File > Import-Export",
    "support": 'COMMUNITY',
    "category": "Import-Export"
}

import bpy
import json

def main(context):
    for ob in context.scene.objects:
        mats = ob.material_slots
        objType = ""
        if "cube" in mats or "Cube" in mats:
            objType = "Cube"
        if "sphere" in mats or "Sphere" in mats:
            objType = "Sphere"
        if "cylinder" in mats or "Cylinder" in mats:
            objType = "Cylinder"
        if "capsule" in mats or "Capsule" in mats:
            objType = "Capsule"
        if "plane" in mats or "Plane" in mats:
            objType = "Plane"
        if "quad" in mats or "Quad" in mats:
            objType = "Quad"
        if "triangle" in mats or "Triangle" in mats:
            objType = "Triangle"
        print(objType)
        matCol = mats["color"].material.diffuse_color
        col = (
        round(matCol[0]*1000)/1000,
        round(matCol[1]*1000)/1000,
        round(matCol[2]*1000)/1000,
        round(matCol[3]*1000)/1000
        )
        pos = (
        round(ob.location[0]*1000)/1000,
        round(ob.location[2]*1000)/1000,
        round(ob.location[1]*1000)/1000
        )
        rot = (
        round(ob.rotation_euler[0]*360*1000)/1000,
        round(ob.rotation_euler[2]*360*1000)/1000,
        round(ob.rotation_euler[1]*360*1000)/1000
        )
        scale = (
        round(ob.scale[0]*1000)/1000,
        round(ob.scale[2]*1000)/1000,
        round(ob.scale[1]*1000)/1000
        )
        x = {
            "position": pos,
            "rotation": rot,
            "scale": scale,
            "color": col
        }
        y = json.dumps(x)
        print(y)


class SimpleOperator(bpy.types.Operator):
    """Tooltip"""
    bl_idname = "object.simple_operator"
    bl_label = "Simple Object Operator"

    @classmethod
    def poll(cls, context):
        return context.active_object is not None

    def execute(self, context):
        main(context)
        return {'FINISHED'}
    
class LayoutButton(bpy.types.Panel):
    """Creates a Panel in the scene context"""
    bl_label = "Layout"
    bl_idname = "SCENE_PT_layout"
    bl_space_type = "PROPERTIES"
    bl_region_type = "WINDOW"
    bl_context = "scene"
    
    def draw(self, context):
        layout = self.layout
        
        scene = context.scene
        
        layout.label(text="TEST:")
        row = layout.row()
        row.scale_y = 2.0
        row.operator("object.simple_operator")

# Register and add to the "object" menu (required to also use F3 search "Simple Object Operator" for quick access)
def register():
    bpy.utils.register_class(SimpleOperator)
    bpy.utils.register_class(LayoutButton)


def unregister():
    bpy.utils.unregister_class(SimpleOperator)
    bpy.utils.unregister_class(LayoutButton)


if __name__ == "__main__":
    register()

    # test call
    bpy.ops.object.simple_operator()
