from rest.models.medical_history import MedicalHistory
from rest.serializers.medical_history import MedicalHistorySerializer
from rest_framework import viewsets


class MedicalHistoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = MedicalHistory.objects.all().order_by('patient_id')
    serializer_class = MedicalHistorySerializer