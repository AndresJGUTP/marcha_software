import os
from utils.constants import STORAGE_PATH, SESSION_STRING_TEMPLATE, RAW_C3D_FILENAME, RAW_CSV_EEG_FILENAME
import base64

def save_file(f, path):
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

class FolderHandler():
    def __init__(self, session_id, patient_id):
        self.patient_id = patient_id
        self.session_id = session_id

        self.base_path = os.path.join(STORAGE_PATH, self.patient_id)
        self.session_folder_name = SESSION_STRING_TEMPLATE.format(self.session_id)

        if not os.path.isdir(self.base_path):
            os.mkdir(self.base_path)

    def create_sesion(self, current_datetime):
        session_path = os.path.join(self.base_path, self.session_folder_name)
        if not os.path.exists(session_path):
            os.mkdir(session_path)
            os.mkdir(os.path.join(session_path, 'kinematic'))
            os.mkdir(os.path.join(session_path, 'dynamic'))
            os.mkdir(os.path.join(session_path, 'eeg'))
            os.mkdir(os.path.join(session_path, 'attacheds'))

    def save_kinematic_c3d(self, c3d_file):
        save_file(c3d_file, os.path.join(self.base_path, self.session_folder_name, 'kinematic', RAW_C3D_FILENAME))

    def save_eeg_csv(self, csv_file):
        save_file(csv_file, os.path.join(self.base_path, self.session_folder_name, 'eeg', RAW_CSV_EEG_FILENAME))

    def save_attacheds_imgs(self, img_files):
        attacheds_path = os.path.join(self.base_path, self.session_folder_name, 'attacheds', 'images')
        if not os.path.exists(attacheds_path):
            os.mkdir(attacheds_path)
        
        for img_file in img_files:
            if img_file.name.endswith(('.png', '.jpg', '.jpeg')):
                save_file(img_file, os.path.join(attacheds_path, img_file.name))
            else:
                print(f"Formato no soportado: {img_file.name}")

    def get_kinematic_dir(self):
        return os.path.join(self.base_path, self.session_folder_name, 'kinematic')

    def get_dynamic_dir(self):
        return os.path.join(self.base_path, self.session_folder_name, 'dynamic')

    def get_eeg_dir(self):
        return os.path.join(self.base_path, self.session_folder_name, 'eeg')
    
    def get_attached_images_base64(self):
        attacheds_path = os.path.join(self.base_path, self.session_folder_name, 'attacheds', 'images')
        images_base64 = []
        if os.path.exists(attacheds_path):
            for image_name in os.listdir(attacheds_path):
                if image_name.endswith(('.png', '.jpg', '.jpeg')):
                    image_path = os.path.join(attacheds_path, image_name)
                    with open(image_path, "rb") as image_file:
                        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                        images_base64.append(encoded_string)
        return images_base64

    def set_session_folder_name(self, folder_name):
        self.session_folder_name = folder_name
