from rest_framework import serializers
# from backend_marcha.documentTypes.models import DocumentTypes
from rest.models.document_type import DocumentType#, Parent, Patient, Session

class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ('ID_document_type', 'document_name')

    def update(self, instance, validated_data):
        instance.document_name = validated_data.get('document_name', instance.document_name)
        instance.save()
        return instance
