from django.contrib import admin
from .models.parent import Parent
from .models.patient import Patient
from .models.session import Session
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class ParentAdmin(ImportExportModelAdmin):
    list_display=[field.name for field in Parent._meta.fields]

class PatientAdmin(ImportExportModelAdmin):
    list_display=[field.name for field in Patient._meta.fields]

class SessionAdmin(ImportExportModelAdmin):
    list_display=[field.name for field in Session._meta.fields]

admin.site.register(Parent, ParentAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Session, SessionAdmin)