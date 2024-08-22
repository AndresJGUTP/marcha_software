import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


STORAGE_PATH = env('S3_ENV')

SESSION_STRING_TEMPLATE = 'session_{}' # session_{session_id}

DATE_FORMAT = "%Y-%m-%dT%H%M%SZ"

RAW_C3D_FILENAME = '01_raw_kinematic_data.c3d'

RAW_CSV_EEG_FILENAME = '01_raw_eeg_data.csv'