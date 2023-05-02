from django.db import models
from .document_type import DocumentType
from .parent import Parent

class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    patient_document_number = models.CharField(max_length=50)
    id_parent = models.ForeignKey(Parent, on_delete=models.PROTECT)
    ID_document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT)
    first_name = models.CharField(max_length=50, blank=False)
    second_name = models.CharField(max_length=50, blank=True)
    first_last_name = models.CharField(max_length=50, blank=False)
    second_last_name = models.CharField(max_length=50, blank=True)
    
    class Meta:
        ordering = ['patient_document_number']