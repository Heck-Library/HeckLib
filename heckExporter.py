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

hmd = True

import json
import bpy

def objData(x):
    deez = "yo"
    if (x.material_slots):
        deez = x.material_slots[0].name
    cool = {
        "rotation": (round(x.rotation_euler[0], 3),round(x.rotation_euler[1], 3),round(x.rotation_euler[2], 3)),
        "position":(round(x.location[0], 3),round(x.location[1], 3),round(x.location[2], 3)),
        "scale":(round(x.scale[0], 3),round(x.scale[1], 3),round(x.scale[2], 3)),
        "shape":deez,
    }
    return cool

def write_some_data(context, filepath, use_some_setting):
    objs = []
    for obj in bpy.data.objects:
        stuff = objData(obj)
        objs.append(stuff)
    print("running hecklib export...")
    thingy = {"objects":objs}
    f = open(filepath, 'w', encoding='utf-8')
    f.write(json.dumps(thingy, indent=4))
    f.close()

    return {'FINISHED'}

from bpy_extras.io_utils import ExportHelper
from bpy.props import StringProperty
from bpy.types import Operator


class ExportHeck(Operator, ExportHelper):
    bl_idname = "export_test.some_data" 
    bl_label = "Export Some Data"

    filename_ext = ".json"

    filter_glob: StringProperty(
        default="*.json",
        options={'HIDDEN'},
        maxlen=255,
    )

    def execute(self, context):
        return write_some_data(context, self.filepath, True)


def menu_func_export(self, context):
    self.layout.operator(ExportHeck.bl_idname, text="HeckLib Export (.json)")

def register():
    bpy.utils.register_class(ExportHeck)
    bpy.types.TOPBAR_MT_file_export.append(menu_func_export)


def unregister():
    bpy.utils.unregister_class(ExportHeck)
    bpy.types.TOPBAR_MT_file_export.remove(menu_func_export)


if hmd:
    register()
    hmd = False