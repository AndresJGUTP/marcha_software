from rest.models.session import Session
from rest.serializers.session import SessionSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Session.objects.all().order_by('session_date')
    serializer_class = SessionSerializer

    @action(detail=True)
    def get_session_by_patient_id(self, request, pk=None):

        queryset = Session.objects.filter(patient_id=pk)
        serializer = SessionSerializer(queryset, many=True)

        return Response(serializer.data)
