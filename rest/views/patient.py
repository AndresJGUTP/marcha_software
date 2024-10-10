import json
from datetime import datetime
from django.http import HttpResponse
from rest_framework.decorators import action
from rest_framework import viewsets
from rest.models.patient import Patient
from rest.serializers.patient import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited, and provides export functionality.
    """
    queryset = Patient.objects.all().order_by('id')
    serializer_class = PatientSerializer

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        # Formatear el nombre del archivo como DDMMYYYY_HHMM_patients.json
        now = datetime.now()
        filename = now.strftime("%d%m%Y_%H%M") + "_patients.json"

        # Crear la respuesta con el tipo de contenido JSON
        response = HttpResponse(content_type='application/json')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        # Serializar los datos de los pacientes a formato JSON
        patients_data = []
        for patient in Patient.objects.all():
            patient_data = {
                'id': patient.id,
                'ID_document_type': patient.ID_document_type,
                'first_name': patient.first_name,
                'second_name': patient.second_name,
                'first_last_name': patient.first_last_name,
                'second_last_name': patient.second_last_name,
                'sex': patient.sex,
                'age': patient.age,
                'id_parent': patient.id_parent_id  # Exportar solo el ID del parent
            }
            patients_data.append(patient_data)

        # Escribir los datos serializados en el archivo JSON
        response.write(json.dumps(patients_data, indent=4))

        return response
