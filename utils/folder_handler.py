import os
from datetime import datetime


STORAGE_PATH = '../storage'
SESSION_STRING_TEMPLATE = 'session_{}_{}' # session_{datetime}_{patient_id}
DATE_FORMAT = "%d%m%Y_%H%M%S"

class FolderHandler():
    def __init__(self, patient_id):
        
        self.patient_id = patient_id
        self.base_path = os.path.join(STORAGE_PATH, self.patient_id )
        self.session_folder_name = None

        if not os.path.isdir( self.base_path ):
            os.mkdir(self.base_path)

    def create_sesion(self):
        current_datetime = datetime.now().strftime(DATE_FORMAT)
        session_folder_name = SESSION_STRING_TEMPLATE.format(current_datetime, self.patient_id)
        self.session_folder_name = session_folder_name

        session_path = os.path.join(self.base_path, session_folder_name)
        os.mkdir( session_path )
        os.mkdir( os.path.join(session_path, 'kinematic') )
        os.mkdir( os.path.join(session_path, 'dynamic') )
        os.mkdir( os.path.join(session_path, 'eeg') )

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
