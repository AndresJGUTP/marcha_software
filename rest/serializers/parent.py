from rest_framework import serializers
from rest.models.parent import Parent

class ParentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = (
            'id',
            'ID_document_type', 
            'first_name', 
            'second_name', 
            'first_last_name', 
            'second_last_name', 
            'email', 
            'phone'
            )