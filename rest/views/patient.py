from rest.models.patient import Patient
from rest.serializers.patient import PatientSerializer
from rest_framework import viewsets


class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Patient.objects.all().order_by('patient_document_number')
    serializer_class = PatientSerializer