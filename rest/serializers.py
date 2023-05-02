# from rest_framework import serializers
# # from backend_marcha.documentTypes.models import DocumentTypes
# from .models.document_type import DocumentType#, Parent, Patient, Session

# class DocumentTypesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DocumentType
#         fields = ('ID_document_type', 'document_name')

#     def update(self, instance, validated_data):
#         instance.document_name = validated_data.get('document_name', instance.document_name)
#         instance.save()
#         return instance

# class ParentSerializer(serializers.ModelSerializer):
#     ID_document_type = serializers.StringRelatedField()

#     class Meta:
#         model = Parent
#         fields = (
#             'parent_document_number', 
#             'ID_document_type', 
#             'first_name', 
#             'second_name', 
#             'first_last_name', 
#             'second_last_name', 
#             'email', 
#             'phone'
#             )
        
# class PatientSerializer(serializers.ModelSerializer):
#     parent_document_number = serializers.StringRelatedField()
#     ID_document_type = serializers.StringRelatedField()

#     class Meta:
#         model = Patient
#         fields = (
#             'patient_document_number',
#             'parent_document_number',
#             'ID_document_type',
#             'first_name',
#             'second_name',
#             'first_last_name', 
#             'second_last_name'
#             )

# class SessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Session
#         fields = (
#             'session_id',
#             'patient_document_number',
#             'physiotherapist_name',
#             'patient_age'
#             )
