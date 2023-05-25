from rest.models.physical_exam import PhysicalExam
from rest.serializers.physical_exam import PhysicalExamSerializer
from rest_framework import viewsets


class PhysicalExamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = PhysicalExam.objects.all().order_by('session_id')
    serializer_class = PhysicalExamSerializer