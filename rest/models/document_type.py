from django.db import models

class DocumentType(models.Model):
    ID_document_type = models.CharField(primary_key=True, max_length=5)
    document_name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return f'{self.ID_document_type} - {self.document_name}'
