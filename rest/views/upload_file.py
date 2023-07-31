from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from utils.folder_handler import FolderHandler
from rest.models.session import Session
from rest_framework import status
from rest.serializers.session import SessionSerializer

def handle_uploaded_file(f):
    destination = open('storage/prueba.csv', 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

class FileUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):

        session_id = request.POST['session_id']
        session = Session.objects.get(pk=session_id)

        if not session:
             return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            session_serializer = SessionSerializer(session)

            session_date = session_serializer['session_date'].value.replace(':', '-')
            patient_id = session_serializer['patient_id'].value
            folder_handler = FolderHandler(session_id, patient_id)
            folder_handler.create_sesion(session_date)
            folder_handler.save_kinematic_c3d(request.FILES['kinematic'])

            return Response(status=status.HTTP_200_OK)


    def put(self, request, filename, format=None):
        file_obj = request.data['file']

        return Response(status=204)