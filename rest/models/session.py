from rest.models.patient import Patient
from django.db import models
from django.core.validators import RegexValidator

class Session(models.Model):
    session_id = models.CharField(max_length=50, primary_key=True, 
                                  validators=[RegexValidator(r'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')])
    patient_document_number = models.ForeignKey(Patient, on_delete=models.CASCADE)
    physiotherapist_name = models.CharField(max_length=50, blank=False)
    patient_age = models.IntegerField(blank=False)

    class Meta:
        ordering = ['session_id']