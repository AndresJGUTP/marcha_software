from rest.models.session import Session
from rest.serializers.session import SessionSerializer
from rest_framework import viewsets


class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Session.objects.all().order_by('session_date')
    serializer_class = SessionSerializer