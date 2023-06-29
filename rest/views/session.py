from rest.models.session import Session
from rest.serializers.session import SessionSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from utils.plot_kinematics import plot_kinematics


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

def session_render_pdf_view(request, *args, **kwargs):
    pk = kwargs.get('pk')
    session = get_object_or_404(Session, pk=pk)

    graphic = plot_kinematics('notebooks/data.c3d', return_base64=True)

    template_path = 'session/generate_pdf.html'
    context = {'session': session, 'graphic':graphic}

    # # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')

    # # to directly download the pdf we need attachment 
    # # response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    # # to view on browser we can remove attachment 
    response['Content-Disposition'] = 'filename="report.pdf"'

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