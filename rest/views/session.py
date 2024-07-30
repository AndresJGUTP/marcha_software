from rest.models.session import Session
from rest.serializers.session import SessionSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from utils.plot_kinematics import plot_kinematics, plot_eeg, plot_force_plate
from utils.folder_handler import FolderHandler
import os
from utils.constants import RAW_C3D_FILENAME, RAW_CSV_EEG_FILENAME
from time import strftime

class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Session.objects.all().order_by('session_date')
    serializer_class = SessionSerializer

    @action(detail=True)
    def get_session_by_patient_id(self, request, pk=None):

        queryset = Session.objects.filter(patient_id=pk).order_by('-session_date')
        serializer = SessionSerializer(queryset, many=True)

        return Response(serializer.data)

def session_render_pdf_view(request, *args, **kwargs):
    pk = kwargs.get('pk')
    session = get_object_or_404(Session, pk=pk)
    title_file = f"{strftime('%Y%m%d')}_sesion_{session.id}"

    folderHandler = FolderHandler(session.id, session.patient_id.id)

    c3d_path = os.path.join(folderHandler.get_kinematic_dir(), RAW_C3D_FILENAME)
    eeg_path = os.path.join(folderHandler.get_eeg_dir(), RAW_CSV_EEG_FILENAME)

    c3d_graphic = None
    force_plates_graphic = None
    if os.path.exists(c3d_path):
        c3d_graphic = plot_kinematics(c3d_path, return_base64=True)
        force_plates_graphic = plot_force_plate(c3d_path, return_base64=True)

    eeg_graphic = None
    # if os.path.exists(eeg_path):
    #     eeg_graphic = plot_eeg(eeg_path, return_base64=True)

    template_path = 'session/generate_pdf.html'
    context = {
        'session': session, 
        'c3d_graphic': c3d_graphic, 
        'eeg_graphic': eeg_graphic,
        'force_plates_graphic': force_plates_graphic
    }


    # # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')

    # # to directly download the pdf we need attachment 
    # # response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    # to view on browser we can remove attachment 
    response['Content-Disposition'] = f'filename="{title_file}.pdf"' #'filename="report.pdf"'

    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # # create a pdf
    pisa_status = pisa.CreatePDF(
        html, dest=response)
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response