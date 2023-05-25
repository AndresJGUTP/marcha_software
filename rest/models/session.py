from rest.models.patient import Patient
from django.db import models
from django.core.validators import RegexValidator

'''
Si se deja session_id con la fecha y como primary_key, al modificar la fecha con el método
PUT / PATCH entonces se genera otra primary key y se duplicaría la sesión (se genera otra pk para la misma sesión)
'''

class Session(models.Model):
    # session_id = models.CharField(max_length=50, primary_key=True, 
    #                               validators=[RegexValidator(r'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')])
    # patient_age = models.IntegerField(blank=False)

    session_id = models.AutoField(primary_key=True)
    session_date = models.DateTimeField(help_text="Session date", blank=False, null=False)
    patient_id = models.ForeignKey(Patient, help_text="patient document number", on_delete=models.CASCADE)
    physiotherapist_name = models.CharField(help_text ="physiotherapist name", max_length=30, blank=False)

    class Meta:
        db_table = 'session'
        ordering = ['session_id']
    
    def __str__(self) -> str:
        return f'{self.session_id} - {self.patient_id.first_name} - {self.patient_id.patient_document_number} - {self.patient_id.age} yars old - session {self.session_date}'