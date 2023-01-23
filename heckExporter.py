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

def getJson(context, formatting):
    for ob in bpy.context.scene.objects:
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
        col = (1, 1, 1, 1)
        if "Color" in mats or "color" in mats:
            matCol = mats["color"].material.diffuse_color
            col = (
            round(matCol[0]*1000)/1000,
            round(matCol[1]*1000)/1000,
            round(matCol[2]*1000)/1000,
            round(matCol[3]*1000)/1000
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
        pos = (
        round((ob.location[0]-scale[0]/2)*1000)/1000,
        round((ob.location[2]-scale[2]/2)*1000)/1000,
        round((ob.location[1]-scale[1]/2)*1000)/1000
        )
        x = {
            "position": pos,
            "rotation": rot,
            "scale": scale,
            "color": col
        }
        y = json.dumps(x)
        if formatting == True:
            y = json.dumps(x, indent=4)
        return y

def writeJson(context, filepath, formatting):
    f = open(filepath, 'w', encoding='utf-8')
    f.write(getJson(bpy, formatting))
    f.close()

    return {'FINISHED'}

from bpy_extras.io_utils import ExportHelper

class ExportHeckData(bpy.types.Operator, ExportHelper):
    bl_idname = "export.hecklib"
    bl_label = "Export HeckLib (.json)"

    filename_ext = ".json"

    filter_glob: bpy.props.StringProperty(
        default="*.json",
        options={'HIDDEN'},
        maxlen=255
    )

    use_setting: bpy.props.BoolProperty(
        name="Formatted",
        description="Enables file formatting",
        default=False
    )

    def execute(self, context):
        return writeJson(context, self.filepath, self.use_setting)

def menuExport(self, context):
    self.layout.operator(ExportHeckData.bl_idname, text="HeckLib Export (.json)")

# Register and add to the "object" menu (required to also use F3 search "Simple Object Operator" for quick access)
def register():
    bpy.utils.register_class(ExportHeckData)
    bpy.types.TOPBAR_MT_file_export.append(menuExport)
    print("Registered")
    #bpy.utils.register_class(LayoutButton)


def unregister():
    bpy.utils.unregister_class(ExportHeckData)
    bpy.types.TOPBAR_MT_file_export.remove(menuExport)
    print("Unregistered")
    #bpy.utils.unregister_class(LayoutButton)

register()

if __name__ == "__main__":
    register()

    # test call
    bpy.ops.object.simple_operator()
