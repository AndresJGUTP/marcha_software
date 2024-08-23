from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from utils.folder_handler import FolderHandler
from rest.models.session import Session
from rest_framework import status
from rest.serializers.session import SessionSerializer

class ConfigFileUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):

        filename = request.POST['filename']

        file = request.FILES[filename]

        if filename == 'gait':
            destination = open('app_config/gait_normality_cycle.json', 'wb+')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
        
        elif filename == 'force_plate':
            destination = open('app_config/force_plate_normality.json', 'wb+')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)