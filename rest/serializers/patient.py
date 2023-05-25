from rest_framework import serializers
from rest.models.patient import Patient

class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = (
            'id',
            'patient_document_number',
            'id_parent',
            'age',
            'ID_document_type',
            'first_name',
            'second_name',
            'first_last_name', 
            'second_last_name'
            )