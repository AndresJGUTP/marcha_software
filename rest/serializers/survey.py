from rest_framework import serializers
from rest.models.survey import Survey

class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'