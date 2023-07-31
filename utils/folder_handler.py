import os
from utils.constants import STORAGE_PATH, SESSION_STRING_TEMPLATE, RAW_C3D_FILENAME

def save_file(f, path):
    destination = open(path, 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

class FolderHandler():
    def __init__(self, session_id, patient_id):
        
        self.patient_id = patient_id
        self.session_id = session_id

        self.base_path = os.path.join(STORAGE_PATH, self.patient_id )
        self.session_folder_name = None

        session_folder_name = SESSION_STRING_TEMPLATE.format(self.session_id)
        self.session_folder_name = session_folder_name

        if not os.path.isdir( self.base_path ):
            os.mkdir(self.base_path)

    def create_sesion(self, current_datetime):
        # current_datetime = datetime.now().strftime(DATE_FORMAT)

        session_path = os.path.join(self.base_path, self.session_folder_name)

        if not os.path.exists(session_path):
            os.mkdir( session_path )
            os.mkdir( os.path.join(session_path, 'kinematic') )
            os.mkdir( os.path.join(session_path, 'dynamic') )
            os.mkdir( os.path.join(session_path, 'eeg') )

    def save_kinematic_c3d(self, c3d_file):
        save_file(c3d_file, os.path.join(self.base_path, self.session_folder_name, 'kinematic', RAW_C3D_FILENAME) )

    def get_kinematic_dir(self):
        return os.path.join(self.base_path, self.session_folder_name, 'kinematic')

    def get_dynamic_dir(self):
        return os.path.join(self.session_folder_name, 'dynamic')

    def get_eeg_dir(self):
        return os.path.join(self.session_folder_name, 'eeg')
    
    def set_session_folder_name(self, folder_name):
        self.session_folder_name = folder_name