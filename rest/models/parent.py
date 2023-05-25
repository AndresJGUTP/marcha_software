from django.db import models
from .document_type import DocumentType
from .validators import validator_document_number, validator_phone_number,validator_document_type

'''
En DOCUMENT_CHOISES puse la opción "Seleccione" en caso de que en el formulario sea
obligatorio poner un valor por defecto, para evitar poner CC por defecto puse la opción "Seleccione"
con validación para que no se pueda enviar y así la persona estará obligada a seleccionar y evitar que envíen CC
solo porque sí
'''

class Parent(models.Model):
    DOCUMENT_CHOISES = [(0,'Seleccione'),
                        ('CC', 'Cédula de Ciudadanía'),
                        ('TI', 'Tarjeta de Identidad'),
                        ('RC', 'Registro Civil'),
                        ('CE', 'Cédula de Extranjería'),
                        ('CI', 'Carné de Identidad'),
                        ('DNI', 'Documento Nacional de Identidad')]

    # ID_document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT)
    # parent_document_number = models.CharField(max_length=40)
    # email = models.CharField(max_length=50, blank=True)
    # phone = models.CharField(max_length=50, blank=True)

    id = models.AutoField(primary_key=True)
    ID_document_type = models.CharField(help_text='ID document type', max_length=3, choices=DOCUMENT_CHOISES, 
                                        validators=[validator_document_type])
    
    parent_document_number = models.CharField(help_text='Parent document number', max_length=20, blank=False, null=False,
                                                            validators=[validator_document_number], unique=True)
    
    first_name = models.CharField(help_text='First name', max_length=15, blank=False)
    second_name = models.CharField(help_text='Second name', max_length=15, blank=True)
    first_last_name = models.CharField(help_text='First last name', max_length=15, blank=False)
    second_last_name = models.CharField(help_text='Second last name', max_length=15, blank=True)

    email = models.EmailField(help_text='Email', max_length=20, blank=True)
    phone =  models.CharField(help_text='Phone', max_length=20, blank=False, null=False,
                                                            validators=[validator_document_number], unique=True)
    
    class Meta:
        db_table = 'parent'
        ordering = ['parent_document_number']

    def __str__(self):
        return f'{self.first_name} {self.first_last_name} - {self.ID_document_type} - {self.parent_document_number}'