from rest_framework import serializers
from rest.models.physical_exam import PhysicalExam

class PhysicalExamSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhysicalExam
        fields = (
           'session_id',
            # 'patelar_r',
            # 'patelar_l',
            # 'aquiliano_r',
            # 'aquiliano_l',
            'weight',
            'height',
            'leng_MID',
            'leng_MII',
            'bal_monopodal_r',
            'bal_monopodal_l',
            # 'hiperla_artic',
            'distonia_sig',
            # 'muscular_tone',
            'flexores_cad_r',
            'flexores_cad_l',
            'isquiotibial_r',
            'isquiotibial_l',
            'cuadriceps_r',
            'cuadriceps_l',
            'gastrosoleo_r',
            'gastrosoleo_l',
            'intercondilea_dist',
            'intermaleolar_dist',
            'knee_profile_r',
            'knee_profile_l',
             # Descripción del pie
             )