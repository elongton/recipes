from django.core.files.storage import FileSystemStorage

from django.conf import settings
import os
from uuid import uuid4
from django.utils.deconstruct import deconstructible


class OverwriteStorage(FileSystemStorage):
    def _save(self, name, content):
        self.delete(name)
        return super(OverwriteStorage, self)._save(name, content)
    def get_available_name(self, name, max_length):
        return name

def file_pk_name(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        return '{}.{}'.format(instance.pk, ext)
    else:
        return '{}.{}'.format(uuid4().hex, ext)



# @deconstructible
# class UploadToPathAndRename(object):

#     def __init__(self, path):
#         self.sub_path = path

#     def __call__(self, instance, filename):
#         ext = filename.split('.')[-1]
#         # get filename
#         if instance.pk:
#             filename = '{}.{}'.format(instance.pk, ext)
#         else:
#             # set filename as random string
#             filename = '{}.{}'.format(uuid4().hex, ext)
#         # return the whole path to the file
#         # return os.path.join(self.sub_path, filename)
#         return filename