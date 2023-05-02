from django.db import models
from .document_type import DocumentType

class Parent(models.Model):
    id = models.AutoField(primary_key=True)
    parent_document_number = models.CharField(max_length=40)
    ID_document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT)
    first_name = models.CharField(max_length=50, blank=False)
    second_name = models.CharField(max_length=50, blank=True)
    first_last_name = models.CharField(max_length=50, blank=False)
    second_last_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=50, blank=True)

    class Meta:
        ordering = ['parent_document_number']