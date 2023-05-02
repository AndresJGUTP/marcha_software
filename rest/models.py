# from models import *
# from django.db import models
# from django.core.validators import RegexValidator

# class DocumentTypes(models.Model):
#     ID_document_type = models.CharField(primary_key=True, max_length=5)
#     document_name = models.CharField(max_length=30, blank=False)


# class Parent(models.Model):
#     parent_document_number = models.CharField(max_length=50, primary_key=True)
#     ID_document_type = models.ForeignKey(DocumentTypes, on_delete=models.PROTECT)
#     first_name = models.CharField(max_length=50, blank=False)
#     second_name = models.CharField(max_length=50, blank=True)
#     first_last_name = models.CharField(max_length=50, blank=False)
#     second_last_name = models.CharField(max_length=50, blank=True)
#     email = models.CharField(max_length=50, blank=True)
#     phone = models.CharField(max_length=50, blank=True)

#     class Meta:
#         ordering = ['parent_document_number']


# class Patient(models.Model):
#     patient_document_number = models.CharField(max_length=50, primary_key=True)
#     parent_document_number = models.ForeignKey(Parent, on_delete=models.PROTECT)
#     ID_document_type = models.ForeignKey(DocumentTypes, on_delete=models.PROTECT)
#     first_name = models.CharField(max_length=50, blank=False)
#     second_name = models.CharField(max_length=50, blank=True)
#     first_last_name = models.CharField(max_length=50, blank=False)
#     second_last_name = models.CharField(max_length=50, blank=True)
    
#     class Meta:
#         ordering = ['patient_document_number']


# class Session(models.Model):
#     session_id = models.CharField(max_length=50, primary_key=True, 
#                                   validators=[RegexValidator(r'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')])
#     patient_document_number = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     physiotherapist_name = models.CharField(max_length=50, blank=False)
#     patient_age = models.IntegerField(blank=False)

#     class Meta:
#         ordering = ['session_id']