from django.db import models
from .document_type import DocumentType
from .parent import Parent
from .validators import validator_document_number,validator_document_type, validator_age


class Patient(models.Model):
    DOCUMENT_CHOISES = [(0,'Seleccione'),
                        ('CC', 'Cédula de Ciudadanía'),
                        ('TI', 'Tarjeta de Identidad'),
                        ('RC', 'Registro Civil'),
                        ('CE', 'Cédula de Extranjería'),
                        ('CI', 'Carné de Identidad'),
                        ('DNI', 'Documento Nacional de Identidad')]
    
    # patient_document_number = models.CharField(max_length=50)
    # ID_document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT)

    id = models.AutoField(primary_key=True)
    id_parent = models.ForeignKey(Parent, help_text="ID parent", on_delete=models.PROTECT)
    patient_document_number = models.CharField(help_text='Patient document number', max_length=20, blank=False, null=False,
                                                            validators=[validator_document_number], unique=True)
    ID_document_type = models.CharField(help_text='ID document type', max_length=3, choices=DOCUMENT_CHOISES,
                                        validators=[validator_document_type])
    
    age = models.CharField(help_text="Patient age", max_length=20, blank=False, null=False,
                           validators=[validator_age])

    first_name = models.CharField(help_text='First name', max_length=15, blank=False)
    second_name = models.CharField(help_text='Second name', max_length=15, blank=True)
    first_last_name = models.CharField(help_text='First last name', max_length=15, blank=False)
    second_last_name = models.CharField(help_text='Second last name', max_length=15, blank=True)
        
    class Meta:
        db_table = 'patient'
        ordering = ['patient_document_number']

    def __str__(self):
        return f'{self.first_name} {self.first_last_name} - {self.ID_document_type} - {self.patient_document_number}'