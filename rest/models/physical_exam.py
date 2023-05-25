from django.db import models
from .session import Session

class PhysicalExam(models.Model):

    session_id = models.OneToOneField(Session, help_text="Sesión relacionada", on_delete=models.CASCADE, primary_key=True)

    # Reflejos OT
    # patelar_r = 
    # patelar_l = 
    # aquiliano_r =
    # aquiliano_l = 


    # Medidas antropométricas
    weight = models.FloatField(help_text="Peso [kg]", null=True, blank=True)
    height = models.FloatField(help_text="Talla [mm?? o cm???]", null=True, blank=True)
    leng_MID = models.FloatField(help_text="Longitud MID [mm]", null=True, blank=True)
    leng_MII = models.FloatField(help_text="Longitud MII [mm]", null=True, blank=True)


    # Balance y equilibrio
    bal_monopodal_r = models.FloatField(help_text="Equilibrio monopodal derecho", null=True, blank=True)
    bal_monopodal_l = models.FloatField(help_text="Equilibrio monopodal izquierdo", null=True, blank=True)


    # Tono muscular
    # hiperla_artic = ??? CHOICES positivo/Negativo? el otro renglón qué es
    distonia_sig = models.BooleanField(help_text="Signos de distonía")
    # muscular_tone = ??? CHOICES Espástico/?/?

    # Espacidad (ashworth)
    flexores_cad_r = models.FloatField(help_text="Flexores cadera derecho", null=True, blank=True)
    flexores_cad_l = models.FloatField(help_text="Flexores cadera izquierdo", null=True, blank=True)
    
    isquiotibial_r = models.FloatField(help_text="Isquiotibial derecho", null=True, blank=True)
    isquiotibial_l = models.FloatField(help_text="Isquiotibial izquierdo", null=True, blank=True)

    cuadriceps_r = models.FloatField(help_text="Cuádriceps derecho", null=True, blank=True)
    cuadriceps_l = models.FloatField(help_text="Cuádriceps izquierdo", null=True, blank=True)

    gastrosoleo_r = models.FloatField(help_text="Gastrosoleo derecho", null=True, blank=True)
    gastrosoleo_l = models.FloatField(help_text="Gastrosoleo izquierdo", null=True, blank=True)


    # Varo/Valgo de rodilla
    intercondilea_dist = models.FloatField(help_text="Distancia intercondilea [mm]", null=True, blank=True)
    intermaleolar_dist = models.FloatField(help_text="Distancia intermaleolar [mm]", null=True, blank=True)

    knee_profile_r = models.FloatField(help_text="Perfil de rodilla derecho", null=True, blank=True)
    knee_profile_l = models.FloatField(help_text="Perfil de rodilla izquierdo", null=True, blank=True)


    # Descripción del pie
    # Como CharField con o sin CHOICES


    class Meta:
        db_table = 'physical_exam'
        ordering = ['session_id']

    
    def __str__(self) -> str:
        return f'Physical exam of {self.session_id.patient_id.first_name} {self.session_id.patient_id.first_last_name} - Session {self.session_id.session_date}'



