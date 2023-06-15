import os
from datetime import datetime


STORAGE_PATH = 'storage'
SESSION_STRING_TEMPLATE = 'session_{}_{}' # session_{datetime}_{patient_id}
DATE_FORMAT = "%Y-%m-%dT%H%M%SZ"
# DATE_FORMAT = "%d%m%Y_%H%M%S"

def save_file(f, path):
    destination = open(path, 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

class FolderHandler():
    def __init__(self, patient_id):
        
        self.patient_id = patient_id
        self.base_path = os.path.join(STORAGE_PATH, self.patient_id )
        self.session_folder_name = None

        if not os.path.isdir( self.base_path ):
            os.mkdir(self.base_path)

    def create_sesion(self, current_datetime):
        # current_datetime = datetime.now().strftime(DATE_FORMAT)
        session_folder_name = SESSION_STRING_TEMPLATE.format(current_datetime, self.patient_id)
        self.session_folder_name = session_folder_name

        session_path = os.path.join(self.base_path, session_folder_name)

        if not os.path.exists(session_path):
            os.mkdir( session_path )
            os.mkdir( os.path.join(session_path, 'kinematic') )
            os.mkdir( os.path.join(session_path, 'dynamic') )
            os.mkdir( os.path.join(session_path, 'eeg') )

    def save_kinematic_csv(self, csv_file):
        save_file(csv_file, os.path.join(self.base_path, self.session_folder_name, 'kinematic', '01_raw_kinematic_data.csv') )

    def get_kinematic_dir(self):
        return os.path.join(self.session_folder_name, 'kinematic')

    def get_dynamic_dir(self):
        return os.path.join(self.session_folder_name, 'dynamic')

    def get_eeg_dir(self):
        return os.path.join(self.session_folder_name, 'eeg')
    
    def set_session_folder_name(self, folder_name):
        self.session_folder_name = folder_name


# FolderHandler('1111').create_sesion()
# print(FolderHandler('1111').get_date_from_session('session_27042023_0_1111'))
