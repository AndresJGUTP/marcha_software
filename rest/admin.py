from django.contrib import admin
from .models.document_type import DocumentType
from .models.parent import Parent
from .models.patient import Patient
from .models.session import Session
from .models.medical_history import MedicalHistory
from .models.physical_exam import PhysicalExam


# Register your models here.

admin.site.register(DocumentType)
admin.site.register(Parent)
admin.site.register(Patient)
admin.site.register(Session)
admin.site.register(MedicalHistory)
admin.site.register(PhysicalExam)
