from django.db import models
from .parent import Parent
from .validators import validator_document_number,validator_document_type, validator_age
from constants.document_choices import DOCUMENT_CHOICES

class Patient(models.Model):
    
    id_parent = models.ForeignKey(Parent, help_text="ID parent", on_delete=models.PROTECT)
    id = models.CharField(help_text='Patient document number', max_length=20, blank=False, null=False,
                                                            # validators=[validator_document_number], 
                                                            primary_key=True)
    ID_document_type = models.CharField(help_text='ID document type', max_length=3, choices=DOCUMENT_CHOICES,
                                        validators=[validator_document_type])
    
    age = models.CharField(help_text="Patient age", max_length=20, blank=False, null=False,
                           validators=[validator_age])

    first_name = models.CharField(help_text='First name', max_length=15, blank=False)
    second_name = models.CharField(help_text='Second name', max_length=15, blank=True)
    first_last_name = models.CharField(help_text='First last name', max_length=15, blank=False)
    second_last_name = models.CharField(help_text='Second last name', max_length=15, blank=True)
        
    class Meta:
        db_table = 'patient'
        ordering = ['id']

    def __str__(self):
        return f'{self.first_name} {self.first_last_name} - {self.ID_document_type} - {self.id}'
