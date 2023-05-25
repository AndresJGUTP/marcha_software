from django.db import models
from .patient import Patient

class MedicalHistory(models.Model):
    COGNITIVE_DEFICIT_CHOISES =[(0, 'No aplica'),
                                (1, 'Leve'),
                                (2, 'Medio'),
                                (3, 'Alto')]

    # id = models.AutoField(primary_key=True)
    patient_id = models.OneToOneField(Patient, help_text="Paciente relacionado", on_delete=models.CASCADE, primary_key=True)

    
    # DATOS CLÍNICOS
    motiv_consult = models.CharField(help_text="Motivo de consulta", max_length=255, blank=True)
    expectations = models.CharField(help_text="Expectativas", max_length=255, blank=True)
    allergies = models.CharField(help_text="Alergias", max_length=255, blank=True)
    medical_diag = models.TextField(help_text="Diagnóstico médico", blank=True)


    # ANTECEDENTES
    personal_antecedents = models.TextField(help_text="Antecedentes personales", blank=True)
    surgical_antecedents = models.TextField(help_text="Antecedentes quirúrgicos", blank=True)
    drug_antecedents = models.TextField(help_text="Antecedentes farmacológicos", blank=True)
    familiar_antecedents = models.TextField(help_text="Antecedentes familiares", blank=True)
    take_valproic_acid = models.BooleanField(help_text="Toma ácido valproico")
    cognitive_deficit = models.IntegerField(help_text="Déficit cognitivo", default=None, choices=COGNITIVE_DEFICIT_CHOISES,
                                            null=False)
    

    # ORTESIS Y AYUDAS EXTERNAS
    ortesis_MID =  models.CharField(help_text="Ortesis MID", max_length=255, blank=True)
    ortesis_MII =  models.CharField(help_text="Ortesis MII", max_length=255, blank=True)
    external_aids =  models.CharField(help_text="Ayudas externas", max_length=255, blank=True)


    # FUNCIONALIDAD
    podci = models.FloatField(help_text="PODCI", null=True, blank=True)
    fms_5 = models.FloatField(help_text="FMS 5", null=True, blank=True)
    gmfcs = models.FloatField(help_text="GMFCS", null=True, blank=True)
    fms_50 = models.FloatField(help_text="FMS 50", null=True, blank=True)
    faq = models.FloatField(help_text="FAQ", null=True, blank=True)
    fms_500 = models.FloatField(help_text="FMS 500", null=True, blank=True)
    fms = models.FloatField(help_text="FMS", null=True, blank=True)

    class Meta:
        db_table = 'medical_history'
        ordering = ['patient_id']

    
    def __str__(self) -> str:
        return f'Medical History of {self.patient_id.first_name} {self.patient_id.first_last_name}'