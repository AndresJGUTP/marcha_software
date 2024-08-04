from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from utils.folder_handler import FolderHandler
from rest.models.session import Session
from rest.serializers.session import SessionSerializer
import logging

logger = logging.getLogger(__name__)

class FileUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            session_id = request.POST.get('session_id')
            if not session_id:
                return Response({'error': 'Session ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                session = Session.objects.get(pk=session_id)
            except Session.DoesNotExist:
                return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

            session_serializer = SessionSerializer(session)
            session_date = session_serializer.data['session_date'].replace(':', '-')
            patient_id = session_serializer.data['patient_id']
            
            folder_handler = FolderHandler(session_id, patient_id)
            folder_handler.create_sesion(session_date) 

            if 'kinematic' in request.FILES:
                folder_handler.save_kinematic_c3d(request.FILES['kinematic'])
            elif 'eeg' in request.FILES:
                folder_handler.save_eeg_csv(request.FILES['eeg'])
            elif 'attacheds' in request.FILES:
                images = request.FILES.getlist('attacheds')
                folder_handler.save_attacheds_imgs(images)
            else:
                return Response({'error': 'No valid file type provided'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error during file upload: {e}", exc_info=True)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
