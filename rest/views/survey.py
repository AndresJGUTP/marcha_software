from rest.models.survey import Survey
from rest.serializers.survey import SurveySerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class SurveyViewSet(viewsets.ModelViewSet):
    
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Survey.objects.all().order_by('id')
    serializer_class = SurveySerializer

    @action(detail=True)
    def get_survey_by_session_id(self, request, pk=None):
        queryset = Survey.objects.filter(session_id=pk).order_by('-id')
        serializer = SurveySerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='get_survey_by_session_id/(?P<session_id>[^/.]+)')
    def get_survey_by_session_id(self, request, session_id=None):
        try:
            survey = Survey.objects.get(session_id=session_id)
            serializer = SurveySerializer(survey)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Survey.DoesNotExist:
            return Response({"detail": "Survey not found"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['get'], url_path='get_all_sessions')
    def get_all_sessions(self, request):
        # Obtener solo los valores del campo 'session' de todas las encuestas
        session_values = Survey.objects.values_list('session', flat=True)
        return Response({"sessions": list(session_values)}, status=status.HTTP_200_OK)