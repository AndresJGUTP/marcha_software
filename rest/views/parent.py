from rest.models.parent import Parent
from rest.serializers.parent import ParentSerializer
from rest_framework import viewsets


class ParentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Parent.objects.all().order_by('parent_document_number')
    serializer_class = ParentSerializer