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
from rest.views.upload_file import FileUploadView
from rest.views.upload_config_file import ConfigFileUploadView
from django.urls import include, path
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view


router = routers.DefaultRouter()
router.register(r'parent', ParentViewSet)
router.register(r'patient', PatientViewSet)
router.register(r'session', SessionViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('session_upload/', FileUploadView.as_view()),
    path('upload_configfile/', ConfigFileUploadView.as_view()),
    path('pdf/<pk>/', session_render_pdf_view, name='session_pdf_view'),
    path('openapi', get_schema_view(
            title="Backend Marcha Software Docs",
            description="API for backend marcha software",
            version="1.0.0"
        ), name='openapi-schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)