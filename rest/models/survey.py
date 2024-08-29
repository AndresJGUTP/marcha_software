from django.db import models
from rest.models.session import Session
from constants.choices import SEX_CHOICES
from constants.choices import EDUCATION_LEVEL
from constants.choices import MARITAL_STATUS
from constants.choices import SCALE1, SCALE2, SCALE3, SCALE4, SCALE5, SCALE6
from .validators import validator_sex_type, validator_education_choices, validator_maritalStatus_choices, validator_satisfaction_scale, validator_time_taken_to_complete

class Survey(models.Model):

    id = models.AutoField(primary_key=True)  
    
    session = models.OneToOneField(Session, on_delete=models.CASCADE, null=True, blank=True, help_text="Sesión asociada a la encuesta")
    
    """
    Preguntas Generales.
    """
    sex_type = models.CharField(help_text="Sexo del encuestado", max_length=2, choices=SEX_CHOICES, validators=[validator_sex_type])
    birth_date = models.DateField(help_text="Fecha de nacimiento", null=True, blank=True)
    education_level= models.CharField(help_text="Nivel de educación", max_length=16, choices=EDUCATION_LEVEL, validators=[validator_education_choices])
    marital_status = models.CharField(help_text="Estado civil", max_length=16, choices=MARITAL_STATUS, validators=[validator_maritalStatus_choices])
    is_sick = models.BooleanField(help_text="Se encuentra enfermo?", default=False, blank=True, null=True)
    health_problem = models.TextField(help_text="¿Tiene algún problema con su salud?", max_length=255, blank=True, null=True)
    
    """
    Preguntas con escala.
    """
    quality_of_life_rating  = models.CharField(help_text="¿Cómo calificaría su calidad de vida?", max_length=2, choices=SCALE1, validators=[validator_satisfaction_scale])
    health_satisfaction  = models.CharField(help_text="¿Cómo de satisfecho/a está con su salud?", max_length=2, choices=SCALE2, validators=[validator_satisfaction_scale])
    physical_pain_limitation  = models.CharField(help_text="¿Hasta qué punto piensa que el dolor (físico) le impide hacer lo que necesita?", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    medical_treatment_dependency = models.CharField(help_text="¿En qué grado necesita de un tratamiento médico para funcionar en su vida diaria", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    life_enjoyment = models.CharField(help_text="¿Cuánto disfruta de la vida? ", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    life_meaning = models.CharField(help_text="¿Hasta qué punto siente que su vida tiene sentido?", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    concentration_ability = models.CharField(help_text="¿Cuál es su capacidad de concentración?", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    daily_life_security = models.CharField(help_text="¿Cuánta seguridad siente en su vida diaria?", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    physical_environment_health = models.CharField(help_text="¿Cómo de saludable es el ambiente físico a su alrededor?", max_length=2, choices=SCALE3, validators=[validator_satisfaction_scale])
    daily_energy_level = models.CharField(help_text="¿Tiene energía suficiente para la vida diaria?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    acceptance_of_appearance = models.CharField(help_text="¿Es capaz de aceptar su apariencia física?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    financial_sufficiency = models.CharField(help_text="¿Tiene suficiente dinero para cubrir sus necesidades?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    information_availability_for_daily_life = models.CharField(help_text="¿Dispone de la información que necesita para su vida diaria?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    leisure_activity_opportunities = models.CharField(help_text="¿Hasta qué punto tiene oportunidad de realizar actividades de ocio?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    mobility_capability = models.CharField(help_text="¿Es capaz de desplazarse de un lugar a otro?", max_length=2, choices=SCALE4, validators=[validator_satisfaction_scale])
    sleep_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está con su sueño?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    daily_activities_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está con su habilidad para realizar sus actividades de la vida diaria?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    work_capacity_satisfaction = models.CharField(help_text="¿Cómo de satisfecho/a está con su capacidad de trabajo?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    self_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está de sí mismo?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    personal_relationships_satisfaction = models.CharField(help_text="¿Cómo de satisfecho/a está con sus relaciones personales?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    sexual_life_satisfaction = models.CharField(help_text="¿Cómo de satisfecho/a está con su vida sexual?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    friend_support_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está con el apoyo que obtiene de sus amigos/as?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    living_conditions_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está de las condiciones del lugar donde vive?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    healthcare_access_satisfaction = models.CharField(help_text="¿Cómo de satisfecho/a está con el acceso que tiene a los servicios sanitarios?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    local_transportation_satisfaction =models.CharField(help_text="¿Cómo de satisfecho/a está con los servicios de transporte de su zona?", max_length=2, choices=SCALE5, validators=[validator_satisfaction_scale])
    negative_feelings_frequency =models.CharField(help_text="¿Con qué frecuencia tiene sentimientos negativos, tales como tristeza, desesperanza, ansiedad, o depresión?", max_length=2, choices=SCALE6, validators=[validator_satisfaction_scale])
    
    """
    Preguntas abiertas.
    """
    help_with_questionnaire = models.CharField(help_text="¿Le ha ayudado alguien a rellenar el cuestionario?", max_length=255, blank=True, null=True)
    time_taken_to_complete = models.CharField(help_text="¿Cuánto tiempo ha tardado en contestarlo, en minutos?", max_length=20, blank=True, null=True, validators=[validator_time_taken_to_complete])
    questionnaire_comments = models.CharField(help_text="¿Le gustaría hacer algún comentario sobre el cuestionario?", max_length=255, blank=True, null=True)