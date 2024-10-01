from rest.models.patient import Patient
from django.db import models
from constants.choices import REFLEJOS_PATELAR_CHOICES
from constants.choices import (
    YES_NO_CHOICES, COGNITIVE_DEFICIT_CHOICES, 
    GMFCS_CHOICES, FMS_CHOICES, FAQ_CHOICES, SCORE_BEIGHTON_CHOICES,
    TONO_MUSCULAR_CHOICES, ESPASTICIDAD_CHOICES, PERFIL_RODILLA_CHOICES, DESCR_PIE_TOBILLO_CHOICES,
    DESCR_PIE_RETROPIE_CHOICES, DESCR_PIE_MEDIOPIE_CHOICES, DESCR_PIE_ANTEPIE_CHOICES,
    DESCR_PIE_HALLUX_CHOICES, FUERZA_MUSCULAR_CHOICES, CONTROL_SELECTIVO_CHOICES,
    POSITIVO_NEGATIVO_CHOICES)



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

    id = models.AutoField(primary_key=True)
    patient_id = models.ForeignKey(Patient, help_text="patient document number", on_delete=models.CASCADE)
    session_date = models.DateTimeField(help_text="Session date", blank=False, null=False)
    physiotherapist_name = models.CharField(help_text ="physiotherapist name", max_length=30, blank=True, null=True)
    medico_remitente = models.CharField(help_text ="medico remitente", max_length=30, blank=True, null=True)
    especialidad = models.CharField(help_text ="especialidad", max_length=30, blank=True, null=True)

    # DATOS CLÍNICOS
    motivo_consulta = models.CharField(help_text="Motivo de consulta", max_length=255, blank=True, null=True)
    expectativas = models.CharField(help_text="Expectativas", max_length=255, blank=True, null=True)
    alergias = models.CharField(help_text="Alergias", max_length=255, blank=True, null=True, default="-")
    diagnosticos_medicos = models.TextField(help_text="Diagnósticos médicos", blank=True, null=True)
    dolor = models.CharField(help_text ="Dolor", max_length=30, blank=True, null=True)

    # ANTECEDENTES
    antecedentes_personales = models.TextField(help_text="Antecedentes personales", blank=True, null=True)
    antecedentes_quirurgicos = models.TextField(help_text="Antecedentes quirúrgicos", blank=True, null=True)
    antecedentes_farmacologicos = models.TextField(help_text="Antecedentes farmacológicos", blank=True, null=True)
    antecedentes_familiares = models.TextField(help_text="Antecedentes familiares", blank=True, null=True)

    take_valproic_acid = models.IntegerField(choices=YES_NO_CHOICES, null=True)
    cognitive_deficit = models.IntegerField(choices=COGNITIVE_DEFICIT_CHOICES, null=True)
    

    # ORTESIS Y AYUDAS EXTERNAS
    ortesis_MID =  models.CharField(help_text="Ortesis MID", max_length=50, blank=True, null=True)
    ortesis_MII =  models.CharField(help_text="Ortesis MII", max_length=50, blank=True, null=True)
    ayudas_externas =  models.CharField(help_text="Ayudas externas", max_length=50, blank=True, null=True)


    # FUNCIONALIDAD
    podci = models.CharField(help_text="PODCI", null=True, blank=True, max_length=50)
    gmfcs = models.IntegerField(choices=GMFCS_CHOICES, help_text="GMFCS", null=True)
    faq = models.IntegerField(choices=FAQ_CHOICES, help_text="FAQ", null=True)
    fms_5 = models.IntegerField(choices=FMS_CHOICES, help_text="FMS 5", null=True)
    fms_50 = models.IntegerField(choices=FMS_CHOICES, help_text="FMS 50", null=True)
    fms_500 = models.IntegerField(choices=FMS_CHOICES, help_text="FMS 500", null=True)
    fms = models.IntegerField(choices=FMS_CHOICES, help_text="FMS", null=True)

    ######### EXAMEN FISICO ###############

    # reflejos OT
    reflejos_patelar_d = models.IntegerField(choices=REFLEJOS_PATELAR_CHOICES, null=True)
    reflejos_patelar_i = models.IntegerField(choices=REFLEJOS_PATELAR_CHOICES, null=True)
    reflejos_aquilano_d = models.IntegerField(choices=REFLEJOS_PATELAR_CHOICES, null=True)
    reflejos_aquilano_i = models.IntegerField(choices=REFLEJOS_PATELAR_CHOICES, null=True)

    # Medidas antropométricas
    peso = models.FloatField(help_text="Peso [kg]", null=True, blank=True)
    talla = models.FloatField(help_text="Talla [cm]", null=True, blank=True)
    longitud_MID = models.FloatField(help_text="Longitud MID [mm]", null=True, blank=True)
    longitud_MII = models.FloatField(help_text="Longitud MII [mm]", null=True, blank=True)

    # Balance y equilibrio
    equilibrio_monopodal_d = models.CharField(max_length=50, help_text="Equilibrio monopodal derecho", null=True, blank=True)
    equilibrio_monopodal_i = models.CharField(max_length=50, help_text="Equilibrio monopodal izquierdo", null=True, blank=True)

    # Tono muscular ======================================================================================================
    score_beighton = models.IntegerField(choices=SCORE_BEIGHTON_CHOICES)
    score_beighton_observaciones = models.CharField(max_length=255, null=True, blank=True)
    signos_distonia = models.IntegerField(choices=YES_NO_CHOICES)
    tono_muscular = models.IntegerField(choices=TONO_MUSCULAR_CHOICES)

    # ====================================================================================================================

    # Espacidad (ashworth)
    flexores_cad_d = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Flexores cadera derecho", null=True, blank=True)
    flexores_cad_i = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Flexores cadera izquierdo", null=True, blank=True)
    
    isquiotibial_d = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Isquiotibial derecho", null=True, blank=True)
    isquiotibial_i = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Isquiotibial izquierdo", null=True, blank=True)

    cuadriceps_d = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Cuádriceps derecho", null=True, blank=True)
    cuadriceps_i = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Cuádriceps izquierdo", null=True, blank=True)

    gastrosoleo_d = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Gastrosoleo derecho", null=True, blank=True)
    gastrosoleo_i = models.IntegerField(choices=ESPASTICIDAD_CHOICES, help_text="Gastrosoleo izquierdo", null=True, blank=True)

    # Varo/Valgo de rodilla
    dist_intercondilea = models.FloatField(help_text="Distancia intercondilea [mm]", null=True, blank=True)
    dist_intermaleolar = models.FloatField(help_text="Distancia intermaleolar [mm]", null=True, blank=True)

    perfil_rodilla_d = models.IntegerField(choices=PERFIL_RODILLA_CHOICES, help_text="Perfil de rodilla derecho", null=True, blank=True)
    perfil_rodilla_i = models.IntegerField(choices=PERFIL_RODILLA_CHOICES, help_text="Perfil de rodilla izquierdo", null=True, blank=True)

    # Descripción del pie =========================================================================================================
    descr_pie_apoyo_tobillo_d = models.IntegerField(choices=DESCR_PIE_TOBILLO_CHOICES, null=True)
    descr_pie_apoyo_tobillo_i = models.IntegerField(choices=DESCR_PIE_TOBILLO_CHOICES, null=True)
    descr_pie_apoyo_retropie_d = models.IntegerField(choices=DESCR_PIE_RETROPIE_CHOICES, null=True)
    descr_pie_apoyo_retropie_i = models.IntegerField(choices=DESCR_PIE_RETROPIE_CHOICES, null=True)
    descr_pie_apoyo_mediopie_d = models.IntegerField(choices=DESCR_PIE_MEDIOPIE_CHOICES, null=True)
    descr_pie_apoyo_mediopie_i = models.IntegerField(choices=DESCR_PIE_MEDIOPIE_CHOICES, null=True)
    descr_pie_apoyo_antepie_d = models.IntegerField(choices=DESCR_PIE_ANTEPIE_CHOICES, null=True)
    descr_pie_apoyo_antepie_i = models.IntegerField(choices=DESCR_PIE_ANTEPIE_CHOICES, null=True)
    descr_pie_apoyo_hallux_d = models.IntegerField(choices=DESCR_PIE_HALLUX_CHOICES, null=True)
    descr_pie_apoyo_hallux_i = models.IntegerField(choices=DESCR_PIE_HALLUX_CHOICES, null=True)

    descr_pie_sin_apoyo_tobillo_d = models.IntegerField(choices=DESCR_PIE_TOBILLO_CHOICES, null=True)
    descr_pie_sin_apoyo_tobillo_i = models.IntegerField(choices=DESCR_PIE_TOBILLO_CHOICES, null=True)
    descr_pie_sin_apoyo_retropie_d = models.IntegerField(choices=DESCR_PIE_RETROPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_retropie_i = models.IntegerField(choices=DESCR_PIE_RETROPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_mediopie_d = models.IntegerField(choices=DESCR_PIE_MEDIOPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_mediopie_i = models.IntegerField(choices=DESCR_PIE_MEDIOPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_antepie_d = models.IntegerField(choices=DESCR_PIE_ANTEPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_antepie_i = models.IntegerField(choices=DESCR_PIE_ANTEPIE_CHOICES, null=True)
    descr_pie_sin_apoyo_hallux_d = models.IntegerField(choices=DESCR_PIE_HALLUX_CHOICES, null=True)
    descr_pie_sin_apoyo_hallux_i = models.IntegerField(choices=DESCR_PIE_HALLUX_CHOICES, null=True)
    # ================================================================================================================

    # ----------------------------- prueba_6_minutos ----------------------------- #
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


    # ------------------------- Test articular y muscular ------------------------ #

    # ---------------------------------- TRONCO ---------------------------------- #
    tronco_abdominales_fuerza_muscular = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    tronco_lumbares_fuerza_muscular = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    tronco_abdominales_control_selectivo = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tronco_lumbares_control_selectivo = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)

    # ---------------------------------- CADERA ---------------------------------- #
    cadera_flexion_movilidad_d = models.FloatField(null=True)
    cadera_flexion_movilidad_i = models.FloatField(null=True)
    cadera_flexion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_flexion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_flexion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    cadera_flexion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    cadera_extension_movilidad_d = models.FloatField(null=True)
    cadera_extension_movilidad_i = models.FloatField(null=True)
    cadera_extension_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_extension_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_extension_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    cadera_extension_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    cadera_abduccion_movilidad_d = models.FloatField(null=True)
    cadera_abduccion_movilidad_i = models.FloatField(null=True)
    cadera_abduccion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_abduccion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_abduccion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    cadera_abduccion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    cadera_aduccion_movilidad_d = models.FloatField(null=True)
    cadera_aduccion_movilidad_i = models.FloatField(null=True)
    cadera_aduccion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_aduccion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    cadera_aduccion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    cadera_aduccion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    cadera_rot_int_movilidad_d = models.FloatField(null=True)
    cadera_rot_int_movilidad_i = models.FloatField(null=True)

    cadera_rot_ext_movilidad_d = models.FloatField(null=True)
    cadera_rot_ext_movilidad_i = models.FloatField(null=True)
    # cadera_rot_ext_movilidad_i = models.IntegerField(null=True, blank=True, choices=(10, '23'))

    # =============================================================================================================
    # -------------------------- RETRACCIONES MUSCULARES ------------------------- #
    signo_thomas_d = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    signo_thomas_i = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    signo_phelps_d = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    signo_phelps_i = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    test_ober_d = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    test_ober_i = models.IntegerField(null=True, choices=POSITIVO_NEGATIVO_CHOICES)
    # =============================================================================================================

    # ----------------------------- PERFIL TORSIONAL ----------------------------- #
    anteversion_femoral_d = models.CharField(max_length=50, null=True, blank=True)
    anteversion_femoral_i = models.CharField(max_length=50, null=True, blank=True)

    # ---------------------------------- RODILLA --------------------------------- #
    rodilla_flexion_movilidad_d = models.FloatField(null=True)
    rodilla_flexion_movilidad_i = models.FloatField(null=True)
    rodilla_flexion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    rodilla_flexion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    rodilla_flexion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    rodilla_flexion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    rodilla_extension_movilidad_d = models.FloatField(null=True)
    rodilla_extension_movilidad_i = models.FloatField(null=True)
    rodilla_extension_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    rodilla_extension_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    rodilla_extension_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    rodilla_extension_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    # -------------------------- RETRACCIONES MUSCULARES ------------------------- #
    angulo_popliteo_d = models.CharField(max_length=50, null=True, blank=True)
    angulo_popliteo_i = models.CharField(max_length=50, null=True, blank=True)
    angulo_popliteo_cadera_flex_d = models.CharField(max_length=50, null=True, blank=True)
    angulo_popliteo_cadera_flex_i = models.CharField(max_length=50, null=True, blank=True)
    variacion_angulo_popliteo_d = models.CharField(max_length=50, null=True, blank=True)
    variacion_angulo_popliteo_i = models.CharField(max_length=50, null=True, blank=True)
    signo_ely_duncan_d = models.IntegerField(choices=POSITIVO_NEGATIVO_CHOICES)
    signo_ely_duncan_i = models.IntegerField(choices=POSITIVO_NEGATIVO_CHOICES)
    deficit_ext_act_supino_d = models.CharField(max_length=50, null=True, blank=True)
    deficit_ext_act_supino_i = models.CharField(max_length=50, null=True, blank=True)

    # ---------------------- PERFIL TORSIONAL Y OTROS SIGNOS --------------------- #
    angulo_muslo_pie_d = models.CharField(max_length=50, null=True, blank=True)
    angulo_muslo_pie_i = models.CharField(max_length=50, null=True, blank=True)
    angulo_bimaleolar_d = models.CharField(max_length=50, null=True, blank=True)
    angulo_bimaleolar_i = models.CharField(max_length=50, null=True, blank=True)
    test_2do_dedo_d = models.CharField(max_length=50, null=True, blank=True)
    test_2do_dedo_i = models.CharField(max_length=50, null=True, blank=True)
    patela_alta_d = models.IntegerField(choices=YES_NO_CHOICES)
    patela_alta_i = models.IntegerField(choices=YES_NO_CHOICES)
    perone_corto_d = models.IntegerField(choices=YES_NO_CHOICES)
    perone_corto_i = models.IntegerField(choices=YES_NO_CHOICES)

    # ---------------------------------- TOBILLO --------------------------------- #
    tobillo_plantiflexion_movilidad_d = models.FloatField(null=True)
    tobillo_plantiflexion_movilidad_i = models.FloatField(null=True)
    tobillo_plantiflexion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tobillo_plantiflexion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tobillo_plantiflexion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    tobillo_plantiflexion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    tobillo_dorsiflexion_movilidad_d = models.FloatField(null=True)
    tobillo_dorsiflexion_movilidad_i = models.FloatField(null=True)
    tobillo_dorsiflexion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tobillo_dorsiflexion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tobillo_dorsiflexion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    tobillo_dorsiflexion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    tobillo_soleo_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    tobillo_soleo_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)

    tobillo_signo_silverskiold_movilidad_d = models.IntegerField(choices=POSITIVO_NEGATIVO_CHOICES)
    tobillo_signo_silverskiold_movilidad_i = models.IntegerField(choices=POSITIVO_NEGATIVO_CHOICES)

    # ------------------------------------ PIE ----------------------------------- #
    pie_inversion_movilidad_d = models.FloatField(null=True)
    pie_inversion_movilidad_i = models.FloatField(null=True)
    pie_inversion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_inversion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_inversion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    pie_inversion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    pie_eversion_movilidad_d = models.FloatField(null=True)
    pie_eversion_movilidad_i = models.FloatField(null=True)
    pie_eversion_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_eversion_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_eversion_fuerza_muscular_d = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)
    pie_eversion_fuerza_muscular_i = models.IntegerField(null=True, blank=True, choices=FUERZA_MUSCULAR_CHOICES)

    pie_flexores_hallux_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_flexores_hallux_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_extensores_hallux_control_selectivo_d = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)
    pie_extensores_hallux_control_selectivo_i = models.IntegerField(null=True, blank=True, choices=CONTROL_SELECTIVO_CHOICES)

    # ----------------------------- DIAGNOSTICO FINAL ---------------------------- #
    diagnostico_realizado = models.CharField(help_text="Diagnostico Final", max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'session'
        ordering = ['id']
    
    def __str__(self) -> str:
        return f'{self.id} - {self.patient_id.first_name} - {self.patient_id.id} - {self.patient_id.age} yars old - session {self.session_date}'