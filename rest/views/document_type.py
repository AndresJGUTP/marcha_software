from rest.models.document_type import DocumentType
from rest.serializers.document_type import DocumentTypeSerializer
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

class DocumentTypeViewSet(viewsets.ModelViewSet, mixins.CreateModelMixin):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = DocumentType.objects.all().order_by('ID_document_type')
    serializer_class = DocumentTypeSerializer

    def create(self,request):
        data = request.data
        serializer = DocumentTypeSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)