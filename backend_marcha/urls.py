"""backend_marcha URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest.views.parent import ParentViewSet
from rest.views.patient import PatientViewSet
from rest.views.session import SessionViewSet, session_render_pdf_view
from rest.views.medical_history import MedicalHistoryViewSet
from rest.views.physical_exam import PhysicalExamViewSet
from rest.views.upload_file import FileUploadView
from django.urls import include, path
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
router.register(r'parent', ParentViewSet)
router.register(r'patient', PatientViewSet)
router.register(r'session', SessionViewSet)
router.register(r'medical_history', MedicalHistoryViewSet)
router.register(r'physical_exam', PhysicalExamViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('session_upload/', FileUploadView.as_view()),
    path('pdf/<pk>/', session_render_pdf_view, name='session_pdf_view')
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)