from rest.models.patient import Patient
from django.db import models
from django.core.validators import RegexValidator
from .validators import validator_cognitive_deficit
from constants.cognitive_deficit_choices import COGNITIVE_DEFICIT_CHOISES
from constants.valproic_acid_choices import VALPROIC_ACID_CHOISES
from constants.pie_choices import PIE_CHOICES
from constants.tono_muscular_choices import HIPERLAXITUD_CHOICES, SIGNOS_DISTONIA_CHOISES,TONO_MUSCULAR_CHOICES
from constants.signos_retraccion_muscular_choices import SIGNOS_RETRACCION_MUSCULAR_CHOICES
from constants.rodilla_patela_perone_choices import RODILLA_PATELA_PERONE_CHOICES




class Session(models.Model):
    # ================================================================================
    # Variables CREADAS:
    # ________________________________________________________________________________
    ############## Procedimientos realizados:
    examen_medico = models.BooleanField(help_text="Examen médico", default=False)
    prueba_6_minutos = models.BooleanField(help_text="Prueba de 6 minutos", default=False)
    video_analogo = models.BooleanField(help_text="Video Análogo", default=False)
    podobarometria = models.BooleanField(help_text="Podobarometría", default=False)
    examen_computarizado = models.BooleanField(help_text="Examen computarizado de la marcha", default=False)

    ############## Antecedentes
    # take_valproic_acid = models.IntegerField(choices=VALPROIC_ACID_CHOISES,) #validators=[validator_cognitive_deficit])
    # cognitive_deficit = models.IntegerField(choices=COGNITIVE_DEFICIT_CHOISES,) #validators=[validator_cognitive_deficit])

    id = models.AutoField(primary_key=True)
    patient_id = models.ForeignKey(Patient, help_text="patient document number", on_delete=models.CASCADE)
    session_date = models.DateTimeField(help_text="Session date", blank=False, null=False)
    physiotherapist_name = models.CharField(help_text ="physiotherapist name", max_length=30, blank=True, null=True)

    # DATOS CLÍNICOS
    motivo_consulta = models.CharField(help_text="Motivo de consulta", max_length=255, blank=True, null=True)
    expectativas = models.CharField(help_text="Expectativas", max_length=255, blank=True, null=True)
    alergias = models.CharField(help_text="Alergias", max_length=255, blank=True, null=True, default="-")
    diagnosticos_medicos = models.TextField(help_text="Diagnósticos médicos", blank=True, null=True)


    # ANTECEDENTES
    antecedentes_personales = models.TextField(help_text="Antecedentes personales", blank=True, null=True)
    antecedentes_quirurgicos = models.TextField(help_text="Antecedentes quirúrgicos", blank=True, null=True)
    antecedentes_farmacologicos = models.TextField(help_text="Antecedentes farmacológicos", blank=True, null=True)
    antecedentes_familiares = models.TextField(help_text="Antecedentes familiares", blank=True, null=True)

    

    # ORTESIS Y AYUDAS EXTERNAS
    ortesis_MID =  models.CharField(help_text="Ortesis MID", max_length=255, blank=True, null=True)
    ortesis_MII =  models.CharField(help_text="Ortesis MII", max_length=255, blank=True, null=True)
    ayudas_externas =  models.CharField(help_text="Ayudas externas", max_length=255, blank=True, null=True)


    # FUNCIONALIDAD
    podci = models.FloatField(help_text="PODCI", null=True, blank=True)
    fms_5 = models.FloatField(help_text="FMS 5", null=True, blank=True)
    gmfcs = models.FloatField(help_text="GMFCS", null=True, blank=True)
    fms_50 = models.FloatField(help_text="FMS 50", null=True, blank=True)
    faq = models.FloatField(help_text="FAQ", null=True, blank=True)
    fms_500 = models.FloatField(help_text="FMS 500", null=True, blank=True)
    fms = models.FloatField(help_text="FMS", null=True, blank=True)

    ######### EXAMEN FISICO ###############

    # reflejos OT
    reflejos_patelar_d = models.FloatField(null=True, blank=True)
    reflejos_patelar_i = models.FloatField(null=True, blank=True)
    reflejos_aquilano_d = models.FloatField(null=True, blank=True)
    reflejos_aquilano_i = models.FloatField(null=True, blank=True)

    # Medidas antropométricas
    peso = models.FloatField(help_text="Peso [kg]", null=True, blank=True)
    talla = models.FloatField(help_text="Talla [cm]", null=True, blank=True)
    longitud_MID = models.FloatField(help_text="Longitud MID [mm]", null=True, blank=True)
    longitud_MII = models.FloatField(help_text="Longitud MII [mm]", null=True, blank=True)

    # Balance y equilibrio
    equilibrio_monopodal_d = models.FloatField(help_text="Equilibrio monopodal derecho", null=True, blank=True)
    equilibrio_monopodal_i = models.FloatField(help_text="Equilibrio monopodal izquierdo", null=True, blank=True)

    # Tono muscular ======================================================================================================
    hiperlaxitud_articular_i = models.IntegerField(choices=HIPERLAXITUD_CHOICES)
    hiperlaxitud_articular_d = models.IntegerField(choices=HIPERLAXITUD_CHOICES)
    signos_distonia = models.IntegerField(choices=SIGNOS_DISTONIA_CHOISES)
    tono_muscular = models.IntegerField(choices=TONO_MUSCULAR_CHOICES)

    # ====================================================================================================================

    # Espacidad (ashworth)
    flexores_cad_d = models.FloatField(help_text="Flexores cadera derecho", null=True, blank=True)
    flexores_cad_i = models.FloatField(help_text="Flexores cadera izquierdo", null=True, blank=True)
    
    isquiotibial_d = models.FloatField(help_text="Isquiotibial derecho", null=True, blank=True)
    isquiotibial_i = models.FloatField(help_text="Isquiotibial izquierdo", null=True, blank=True)

    cuadriceps_d = models.FloatField(help_text="Cuádriceps derecho", null=True, blank=True)
    cuadriceps_i = models.FloatField(help_text="Cuádriceps izquierdo", null=True, blank=True)

    gastrosoleo_d = models.FloatField(help_text="Gastrosoleo derecho", null=True, blank=True)
    gastrosoleo_i = models.FloatField(help_text="Gastrosoleo izquierdo", null=True, blank=True)

    # Varo/Valgo de rodilla
    dist_intercondilea = models.FloatField(help_text="Distancia intercondilea [mm]", null=True, blank=True)
    dist_intermaleolar = models.FloatField(help_text="Distancia intermaleolar [mm]", null=True, blank=True)

    perfil_rodilla_d = models.FloatField(help_text="Perfil de rodilla derecho", null=True, blank=True)
    perfil_rodilla_i = models.FloatField(help_text="Perfil de rodilla izquierdo", null=True, blank=True)

    # Descripción del pie =========================================================================================================
    descr_pie_apoyo_tobillo_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_tobillo_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_retropie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_retropie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_mediopie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_mediopie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_antepie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_antepie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_hallux_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_apoyo_hallux_i = models.IntegerField(choices=PIE_CHOICES)

    descr_pie_sin_apoyo_tobillo_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_tobillo_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_retropie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_retropie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_mediopie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_mediopie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_antepie_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_antepie_i = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_hallux_d = models.IntegerField(choices=PIE_CHOICES)
    descr_pie_sin_apoyo_hallux_i = models.IntegerField(choices=PIE_CHOICES)
    # ================================================================================================================

    # prueba_6_minutos
    frec_cardiaca_inicial = models.FloatField(null=True, blank=True)
    frec_cardiaca_final = models.FloatField(null=True, blank=True)

    tiempo_1_distancia = models.FloatField(null=True, blank=True)
    tiempo_1_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_1_frec_cardiaca = models.FloatField(null=True, blank=True)

    tiempo_2_distancia = models.FloatField(null=True, blank=True)
    tiempo_2_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_2_frec_cardiaca = models.FloatField(null=True, blank=True)

    tiempo_3_distancia = models.FloatField(null=True, blank=True)
    tiempo_3_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_3_frec_cardiaca = models.FloatField(null=True, blank=True)

    tiempo_4_distancia = models.FloatField(null=True, blank=True)
    tiempo_4_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_4_frec_cardiaca = models.FloatField(null=True, blank=True)

    tiempo_5_distancia = models.FloatField(null=True, blank=True)
    tiempo_5_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_5_frec_cardiaca = models.FloatField(null=True, blank=True)

    tiempo_6_distancia = models.FloatField(null=True, blank=True)
    tiempo_6_distancia_acumulada = models.FloatField(null=True, blank=True)
    tiempo_6_frec_cardiaca = models.FloatField(null=True, blank=True)

    gasto_energetico = models.FloatField(null=True, blank=True)
    velocidad = models.FloatField(null=True, blank=True)
    escala_borg = models.FloatField(null=True, blank=True)
    observaciones_prueba_6_min = models.CharField(max_length=255, null=True, blank=True)


    # Test articular y muscular
    tronco_abdominales_fuerza_muscular = models.FloatField(null=True, blank=True)
    tronco_lumbares_fuerza_muscular = models.FloatField(null=True, blank=True)

    cadera_flexion_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_flexion_movilidad_i = models.FloatField(null=True, blank=True)
    cadera_flexion_control_selectivo_d = models.FloatField(null=True, blank=True)
    cadera_flexion_control_selectivo_i = models.FloatField(null=True, blank=True)
    cadera_flexion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    cadera_flexion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    cadera_extension_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_extension_movilidad_i = models.FloatField(null=True, blank=True)
    cadera_extension_control_selectivo_d = models.FloatField(null=True, blank=True)
    cadera_extension_control_selectivo_i = models.FloatField(null=True, blank=True)
    cadera_extension_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    cadera_extension_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    cadera_abduccion_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_abduccion_movilidad_i = models.FloatField(null=True, blank=True)
    cadera_abduccion_control_selectivo_d = models.FloatField(null=True, blank=True)
    cadera_abduccion_control_selectivo_i = models.FloatField(null=True, blank=True)
    cadera_abduccion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    cadera_abduccion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    cadera_aduccion_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_aduccion_movilidad_i = models.FloatField(null=True, blank=True)
    cadera_aduccion_control_selectivo_d = models.FloatField(null=True, blank=True)
    cadera_aduccion_control_selectivo_i = models.FloatField(null=True, blank=True)
    cadera_aduccion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    cadera_aduccion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    cadera_rot_int_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_rot_int_movilidad_i = models.FloatField(null=True, blank=True)

    cadera_rot_ext_movilidad_d = models.FloatField(null=True, blank=True)
    cadera_rot_ext_movilidad_i = models.FloatField(null=True, blank=True)

    signo_thomas_d = models.FloatField(null=True, blank=True)
    signo_thomas_i = models.FloatField(null=True, blank=True)
    # =============================================================================================================
    signo_phelps_d = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    signo_phelps_i = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    test_ober_d = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    test_ober_i = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    # =============================================================================================================

    anteversion_femoral_d = models.FloatField(null=True, blank=True)
    anteversion_femoral_i = models.FloatField(null=True, blank=True)

    rodilla_flexion_movilidad_d = models.FloatField(null=True, blank=True)
    rodilla_flexion_movilidad_i = models.FloatField(null=True, blank=True)
    rodilla_flexion_control_selectivo_d = models.FloatField(null=True, blank=True)
    rodilla_flexion_control_selectivo_i = models.FloatField(null=True, blank=True)
    rodilla_flexion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    rodilla_flexion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    rodilla_extension_movilidad_d = models.FloatField(null=True, blank=True)
    rodilla_extension_movilidad_i = models.FloatField(null=True, blank=True)
    rodilla_extension_control_selectivo_d = models.FloatField(null=True, blank=True)
    rodilla_extension_control_selectivo_i = models.FloatField(null=True, blank=True)
    rodilla_extension_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    rodilla_extension_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    angulo_popliteo_d = models.FloatField(null=True, blank=True)
    angulo_popliteo_i = models.FloatField(null=True, blank=True)
    angulo_popliteo_cadera_flex_d = models.FloatField(null=True, blank=True)
    angulo_popliteo_cadera_flex_i = models.FloatField(null=True, blank=True)
    variacion_angulo_popliteo_d = models.FloatField(null=True, blank=True)
    variacion_angulo_popliteo_i = models.FloatField(null=True, blank=True)
    # ====================================================================================================
    signo_ely_duncan_d = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    signo_ely_duncan_i = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    # ====================================================================================================

    deficit_ext_act_supino_d = models.FloatField(null=True, blank=True)
    deficit_ext_act_supino_i = models.FloatField(null=True, blank=True)

    angulo_muslo_pie_d = models.FloatField(null=True, blank=True)
    angulo_muslo_pie_i = models.FloatField(null=True, blank=True)
    angulo_bimaleolar_d = models.FloatField(null=True, blank=True)
    angulo_bimaleolar_i = models.FloatField(null=True, blank=True)
    test_2do_dedo_d = models.FloatField(null=True, blank=True)
    test_2do_dedo_i = models.FloatField(null=True, blank=True)

    # =========================================================================================================
    patela_alta_d = models.IntegerField(choices=RODILLA_PATELA_PERONE_CHOICES,)
    patela_alta_i = models.IntegerField(choices=RODILLA_PATELA_PERONE_CHOICES,)
    perone_corto_d = models.IntegerField(choices=RODILLA_PATELA_PERONE_CHOICES,)
    perone_corto_i = models.IntegerField(choices=RODILLA_PATELA_PERONE_CHOICES,)
    # =========================================================================================================

    tobillo_plantiflexion_movilidad_d = models.FloatField(null=True, blank=True)
    tobillo_plantiflexion_movilidad_i = models.FloatField(null=True, blank=True)
    tobillo_plantiflexion_control_selectivo_d = models.FloatField(null=True, blank=True)
    tobillo_plantiflexion_control_selectivo_i = models.FloatField(null=True, blank=True)
    tobillo_plantiflexion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    tobillo_plantiflexion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    tobillo_dorsiflexion_movilidad_d = models.FloatField(null=True, blank=True)
    tobillo_dorsiflexion_movilidad_i = models.FloatField(null=True, blank=True)
    tobillo_dorsiflexion_control_selectivo_d = models.FloatField(null=True, blank=True)
    tobillo_dorsiflexion_control_selectivo_i = models.FloatField(null=True, blank=True)
    tobillo_dorsiflexion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    tobillo_dorsiflexion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    tobillo_soleo_control_selectivo_d = models.FloatField(null=True, blank=True)
    tobillo_soleo_control_selectivo_i = models.FloatField(null=True, blank=True)

    # =========================================================================================================
    tobillo_signo_silverskiold_movilidad_d = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    tobillo_signo_silverskiold_movilidad_i = models.IntegerField(choices=SIGNOS_RETRACCION_MUSCULAR_CHOICES,)
    # =========================================================================================================


    pie_inversion_movilidad_d = models.FloatField(null=True, blank=True)
    pie_inversion_movilidad_i = models.FloatField(null=True, blank=True)
    pie_inversion_control_selectivo_d = models.FloatField(null=True, blank=True)
    pie_inversion_control_selectivo_i = models.FloatField(null=True, blank=True)
    pie_inversion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    pie_inversion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    pie_eversion_movilidad_d = models.FloatField(null=True, blank=True)
    pie_eversion_movilidad_i = models.FloatField(null=True, blank=True)
    pie_eversion_control_selectivo_d = models.FloatField(null=True, blank=True)
    pie_eversion_control_selectivo_i = models.FloatField(null=True, blank=True)
    pie_eversion_fuerza_muscular_d = models.FloatField(null=True, blank=True)
    pie_eversion_fuerza_muscular_i = models.FloatField(null=True, blank=True)

    pie_flexores_hallux_control_selectivo_d = models.FloatField(null=True, blank=True)
    pie_flexores_hallux_control_selectivo_i = models.FloatField(null=True, blank=True)
    pie_extensores_hallux_control_selectivo_d = models.FloatField(null=True, blank=True)
    pie_extensores_hallux_control_selectivo_i = models.FloatField(null=True, blank=True)
    diagnostico_realizado = models.CharField(help_text="Diagnostico Final", max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'session'
        ordering = ['id']
    
    def __str__(self) -> str:
        return f'{self.id} - {self.patient_id.first_name} - {self.patient_id.id} - {self.patient_id.age} yars old - session {self.session_date}'