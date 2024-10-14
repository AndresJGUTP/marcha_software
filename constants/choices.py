# ---------------------------------- GENERAL --------------------------------- #
YES_NO_CHOICES = [
    (0, '-'),
    (1, 'No'),
    (2, 'Si'),
    (3, 'NE')
]

POSITIVO_NEGATIVO_CHOICES = [
    (0, '-'),
    (1, 'Negativo'),
    (2, 'Positivo'),
    (3, 'NE')
]

# ------------------------------- ANTECEDENTES ------------------------------- #
COGNITIVE_DEFICIT_CHOICES = [
    (0,'-'),
    (1, 'No'),
    (2, 'Leve'),
    (3, 'Moderado'),
    (4, 'Severo'),
    (5, 'NE')
]

# -------------------------------- REFLEJOS OT ------------------------------- #
REFLEJOS_PATELAR_CHOICES = [
    (0, '-'),
    (1, '0'),
    (2, '+'),
    (3, '++'),
    (4, '+++'),
    (5, 'CLONUS'),
    (6, 'NE')
]

# ------------------------------- FUNCIONALIDAD ------------------------------ #
GMFCS_CHOICES = [
    (0, '-'),
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
    (6, 'NE')
]

FMS_CHOICES = [
    (0, '-'),
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
    (6, '6'),
    (7, 'NE')
]

FAQ_CHOICES = [
    (0, '-'),
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
    (6, '6'),
    (7, '7'),
    (8, '8'),
    (9, '9'),
    (10, '10'),
    (11, 'NE')
]

# ------------------------------- TONO MUSCULAR ------------------------------ #
SCORE_BEIGHTON_CHOICES = [
    (0,'-'),
    (1, '1/9'),
    (2, '2/9'),
    (3, '3/9'),
    (4, '4/9'),
    (5, '5/9'),
    (6, '6/9'),
    (7, '7/9'),
    (8, '8/9'),
    (9, '9/9'),
    (10, 'NE')
]

TONO_MUSCULAR_CHOICES = [
    (0,'-'),
    (1, 'Normal'),
    (2, 'Hipotonia'),
    (3, 'Hipertonia'),
    (4, 'NE')
]

ESPASTICIDAD_CHOICES = [
    (0, '-'),
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '0'),
    (6, 'NE')
]

# --------------------------- VARO/VALGO DE RODILLA -------------------------- #
PERFIL_RODILLA_CHOICES = [
    (0, '-'),
    (1, 'Valgo'),
    (2, 'Varo'),
    (3, 'Normal'),
    (4, 'NE')
]

# ----------------------- DESCRIPCION DEL PIE ---------------------- #
DESCR_PIE_TOBILLO_CHOICES = [
    (0, '-'),
    (1, 'Neutro'),
    (2, 'Varo'),
    (3, 'Valgo'),
    (4, 'NE')
]

DESCR_PIE_RETROPIE_CHOICES = [
    (0, '-'),
    (1, 'Neutro'),
    (2, 'Supinación'),
    (3, 'Pronación'),
    (4, 'NE')
]

DESCR_PIE_MEDIOPIE_CHOICES = [
    (0, '-'),
    (1, 'Tipico'),
    (2, 'Cavo'),
    (3, 'Plano'),
    (4, 'NE')
]

DESCR_PIE_ANTEPIE_CHOICES = [
    (0, '-'),
    (1, 'Neutro'),
    (2, 'Supinación'),
    (3, 'Pronación'),
    (4, 'NE')
]

DESCR_PIE_HALLUX_CHOICES = [
    (0, '-'),
    (1, 'Tipico'),
    (2, 'Aducción'),
    (3, 'Abducción'),
    (5, 'NE')
]

# ------------------------- TEST ARTICULAR Y MUSCULAR ------------------------ #

CONTROL_SELECTIVO_CHOICES = [
    (0, '-'),
    (1, '-1'),
    (2, '0'),
    (3, '1'),
    (4, '2'),
    (5, 'NE'),
]

MOVILIDAD_ARTICULAR_CHOICES = [
    (0, '-'),
    (1, '-1'),
    (2, '0'),
    (3, '1'),
    (4, '2'),
    (5, 'NE')
]

FUERZA_MUSCULAR_CHOICES = [
    (0, '-'),
    (1, '0'),
    (2, '1'),
    (3, '2'),
    (4, '3'),
    (5, '4'),
    (6, '5'),
    (7, 'NE')
]

# ------------------------- SURVEY CHOICES ------------------------ #

EDUCATION_LEVEL = [(0,'Seleccione'),
                        (1, 'Ninguno'),
                        (2, 'Primarios'),
                        (3, 'Medios'),
                        (4, 'Universitarios')]

MARITAL_STATUS = [(0,'Seleccione'),
                        (1, 'Soltero/a'),
                        (2, 'Separado/a'),
                        (3, 'Casado/a'),
                        (4, 'Divorciado/a'),
                        (5, 'Viudo/a'),
                        (6, 'En pareja')]

SEX_CHOICES = [(0,'Seleccione'),
                        ('M', 'Masculino'),
                        ('F', 'Femenino'),
                    ]

SCALE1 = [(0,'Seleccione'),
                        (1, 'Muy mala'),
                        (2, 'Regular'),
                        (3, 'Normal'),
                        (4, 'Bastante buena'),
                        (5, 'Muy buena')
                    ]

SCALE2 = [(0,'Seleccione'),
                        (1, 'Muy insatisfecho/a'),
                        (2, 'Un poco insatisfecho/a'),
                        (3, 'Lo normal'),
                        (4, 'Bastante satisfecho/a'),
                        (5, 'Muy satisfecho/a')
                    ]

SCALE3 = [(0,'Seleccione'),
                        (1, 'Nada'),
                        (2, 'Un poco'),
                        (3, 'Lo normal'),
                        (4, 'Bastante'),
                        (5, 'Extremadamente')
                    ]

SCALE4 = [(0,'Seleccione'),
                        (1, 'Nada'),
                        (2, 'Un poco'),
                        (3, 'Lo normal'),
                        (4, 'Bastante'),
                        (5, 'Totalmente')
                    ]

SCALE5 = [(0,'Seleccione'),
                        (1, 'Muy insatisfecho/a'),
                        (2, 'Poco'),
                        (3, 'Lo normal'),
                        (4, 'Bastante satisfecho/a'),
                        (5, 'Muy satisfecho/a')
                    ]

SCALE6 = [(0,'Seleccione'),
                        (1, 'Nunca'),
                        (2, 'Raramente'),
                        (3, 'Moderadamente'),
                        (4, 'Frecuentemente'),
                        (5, 'Siempre')
                    ]