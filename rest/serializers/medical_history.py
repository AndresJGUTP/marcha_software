from rest_framework import serializers
from rest.models.medical_history import MedicalHistory

class MedicalHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalHistory
        fields = (
            # 'id',
            'patient_id',
            #datos clínicos
            'motiv_consult',
            'expectations',
            'allergies',
            'medical_diag',
            #antecedentes
            'personal_antecedents',
            'surgical_antecedents',
            'drug_antecedents',
            'familiar_antecedents',
            'take_valproic_acid',
            'cognitive_deficit',
            #ortesis
            'ortesis_MID',
            'ortesis_MII',
            'external_aids',
            #funcionalidad
            'podci',
            'fms_5',
            'gmfcs',
            'fms_50',
            'faq',
            'fms_500',
            'fms'
            )