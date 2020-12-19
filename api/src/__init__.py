import os


# Data
DATA_FOLDER = 'data'
DATA_CLINICAL_CASES_FOLDER = os.path.join(DATA_FOLDER, 'covid-marato-clinical-cases')
DATA_CLINICAL_CASES_DB = os.path.join(DATA_FOLDER, 'db.pkl')
DATA_EMBEDDINGS = os.path.join(DATA_FOLDER, 'embeddings_full.h5')
DATA_MAPPING = os.path.join(DATA_FOLDER, 'mapping.pkl')
DATA_INDEXES_FOLDER = os.path.join(DATA_FOLDER, 'indexes')

# Sections
SECTION_MEDICAL_HISTORY = 'medical_history'
SECTION_PHYSIC_EXPLORATION = 'physic_exploration'
SECTION_SUPPLEMENTARY_TESTS = 'supplementary_tests'
SECTION_ASSESSMENT = 'assessment'
SECTION_TREATMENT = 'treatment'
SECTION_EVOLUTION = 'evolution'
SECTION_LIST = [
    SECTION_MEDICAL_HISTORY, SECTION_PHYSIC_EXPLORATION, SECTION_SUPPLEMENTARY_TESTS,
    SECTION_ASSESSMENT, SECTION_TREATMENT, SECTION_EVOLUTION
]
SECTION_AGGREGATED = 'aggregated'
SECTION_MAPPING_FILE_TO_NAME = {
    'anamnesis': (SECTION_MEDICAL_HISTORY, False),
    'historia oncologica': (SECTION_MEDICAL_HISTORY, True),
    'historia actual': (SECTION_MEDICAL_HISTORY, True),
    'enfermedad actual': (SECTION_MEDICAL_HISTORY, True),
    'motivo de consulta': (SECTION_MEDICAL_HISTORY, True),
    'medicacion habitual': (SECTION_MEDICAL_HISTORY, True),
    'antecedentes': (SECTION_MEDICAL_HISTORY, True),
    'antecedentes del paciente': (SECTION_MEDICAL_HISTORY, True),
    'antecedentes de la paciente': (SECTION_MEDICAL_HISTORY, True),
    'antecedentes familiares de interes': (SECTION_MEDICAL_HISTORY, True),
    'exploracion fisica': (SECTION_PHYSIC_EXPLORATION, False),
    'examen fisico': (SECTION_PHYSIC_EXPLORATION, False),
    'pruebas complementarias': (SECTION_SUPPLEMENTARY_TESTS, False),
    'resumen pruebas complementarias': (SECTION_SUPPLEMENTARY_TESTS, False),
    'exploraciones complementarias': (SECTION_SUPPLEMENTARY_TESTS, False),
    'analitica': (SECTION_SUPPLEMENTARY_TESTS, True),
    'prueba analiticas': (SECTION_SUPPLEMENTARY_TESTS, True),
    'pruebas de imagen': (SECTION_SUPPLEMENTARY_TESTS, True),
    'diagnostico': (SECTION_ASSESSMENT, False),
    'diagnostico final': (SECTION_ASSESSMENT, False),
    'anatomia patologica': (SECTION_ASSESSMENT, False),
    'juicio diagnostico': (SECTION_ASSESSMENT, False),
    'tratamiento': (SECTION_TREATMENT, False),
    'evolucion': (SECTION_EVOLUTION, False),
    'tratamiento y evolucion': (SECTION_EVOLUTION, False),
    'evolucion y tratamiento': (SECTION_EVOLUTION, False)
}
SECTION_MAPPING_TO_SKIP = ['ver imagenes', 'ver a continuacion']

# Transformer
MODEL_NAME = 'average_word_embeddings_glove.840B.300d'
MODEL_DIMENSIONS = 300
