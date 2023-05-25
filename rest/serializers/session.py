from rest_framework import serializers
# from backend_marcha.documentTypes.models import DocumentTypes
from rest.models.session import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = (
            'session_id',
            'session_date',
            'patient_id',
            'physiotherapist_name',
            )