from django.db import models
from .validators import validator_document_number, validator_phone_number,validator_document_type
from constants.document_choices import DOCUMENT_CHOICES

class Parent(models.Model):

    ID_document_type = models.CharField(help_text='ID document type', max_length=3, choices=DOCUMENT_CHOICES, 
                                        validators=[validator_document_type])
    
    id = models.CharField(help_text='Parent document number', max_length=20, blank=False, null=False,
                                                            # validators=[validator_document_number], 
                                                            unique=True, primary_key=True)
    
    first_name = models.CharField(help_text='First name', max_length=15, blank=False)
    second_name = models.CharField(help_text='Second name', max_length=15, blank=True)
    first_last_name = models.CharField(help_text='First last name', max_length=15, blank=False)
    second_last_name = models.CharField(help_text='Second last name', max_length=15, blank=True)

    email = models.EmailField(help_text='Email', max_length=50, blank=True)
    phone =  models.CharField(help_text='Phone', max_length=20, blank=False, null=False,
                                                            validators=[validator_phone_number])
    
    class Meta:
        db_table = 'parent'
        ordering = ['id']

    def __str__(self):
        return f'{self.first_name} {self.first_last_name} - {self.ID_document_type} - {self.id}'