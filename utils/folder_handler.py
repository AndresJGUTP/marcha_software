import os
from utils.constants import STORAGE_PATH, SESSION_STRING_TEMPLATE, RAW_C3D_FILENAME, RAW_CSV_EEG_FILENAME
import base64
import boto3
import botocore

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

s3 = boto3.client('s3')

S3_BUCKET_NAME = env('S3_BUCKET_NAME')

def save_file(f, bucket, path):
    path = path.rstrip('/')
    s3.put_object(Body=f, Bucket=bucket, Key=path)

def folder_exists(bucket:str, path:str) -> bool:
    '''
    Folder should exists. 
    Folder could be empty.
    '''
    path = path.rstrip('/')
    resp = s3.list_objects(Bucket=bucket, Prefix=path, Delimiter='/',MaxKeys=1)
    return 'CommonPrefixes' in resp

def create_s3_folder(bucket: str, path: str):
    path = path.rstrip('/')
    s3.put_object(Bucket=bucket, Key=(path+'/'))

class FolderHandler():
    def __init__(self, session_id, patient_id):
        self.patient_id = patient_id
        self.session_id = session_id

        self.base_s3_key = os.path.join(STORAGE_PATH, self.patient_id).replace("\\","/")
        self.session_folder_name = SESSION_STRING_TEMPLATE.format(self.session_id)

        if not folder_exists(S3_BUCKET_NAME, self.base_s3_key):
            create_s3_folder(S3_BUCKET_NAME, self.base_s3_key)

    def create_sesion(self, current_datetime):
        session_s3_key = os.path.join(self.base_s3_key, self.session_folder_name).replace("\\","/")
        if not folder_exists(S3_BUCKET_NAME, session_s3_key):
            create_s3_folder(S3_BUCKET_NAME, session_s3_key)
            create_s3_folder(S3_BUCKET_NAME, os.path.join(session_s3_key, 'kinematic').replace("\\","/"))
            create_s3_folder(S3_BUCKET_NAME, os.path.join(session_s3_key, 'dynamic').replace("\\","/"))
            create_s3_folder(S3_BUCKET_NAME, os.path.join(session_s3_key, 'eeg').replace("\\","/"))
            create_s3_folder(S3_BUCKET_NAME, os.path.join(session_s3_key, 'attacheds').replace("\\","/"))

    def save_kinematic_c3d(self, c3d_file):
        save_file(c3d_file, S3_BUCKET_NAME, os.path.join(self.base_s3_key, self.session_folder_name, 'kinematic', RAW_C3D_FILENAME).replace("\\","/"))

    def save_eeg_csv(self, csv_file):
        save_file(csv_file, S3_BUCKET_NAME, os.path.join(self.base_s3_key, self.session_folder_name, 'eeg', RAW_CSV_EEG_FILENAME).replace("\\","/"))

    def save_attacheds_imgs(self, img_files):
        attacheds_path = os.path.join(self.base_s3_key, self.session_folder_name, 'attacheds', 'images').replace("\\","/")
        if not folder_exists(S3_BUCKET_NAME, attacheds_path):
            create_s3_folder(S3_BUCKET_NAME, attacheds_path)
        
        for img_file in img_files:
            if img_file.name.endswith(('.png', '.jpg', '.jpeg')):
                save_file(img_file, S3_BUCKET_NAME, os.path.join(attacheds_path, img_file.name).replace("\\","/"))
            else:
                print(f"Formato no soportado: {img_file.name}")

    def get_kinematic_dir(self):
        return os.path.join(self.base_s3_key, self.session_folder_name, 'kinematic').replace("\\","/")

    def get_dynamic_dir(self):
        return os.path.join(self.base_s3_key, self.session_folder_name, 'dynamic').replace("\\","/")

    def get_eeg_dir(self):
        return os.path.join(self.base_s3_key, self.session_folder_name, 'eeg').replace("\\","/")
    
    def get_attached_images_base64(self):
        attacheds_path = os.path.join(self.base_s3_key, self.session_folder_name, 'attacheds', 'images').replace("\\","/")
        images_base64 = []
        if folder_exists(S3_BUCKET_NAME, attacheds_path):
            s3_list_objects = s3.list_objects(Bucket='marcha-storage', Prefix=attacheds_path.rstrip('/')+'/')['Contents']
            if len(s3_list_objects) > 0:
                for dict_result in s3_list_objects:
                    image_key = dict_result['Key']
                    if image_key.endswith(('.png', '.jpg', '.jpeg')):
                        image_file = s3.get_object(Bucket=S3_BUCKET_NAME, Key=image_key)['Body'].read()
                        encoded_string = base64.b64encode(image_file).decode('utf-8')
                        images_base64.append(encoded_string)
        return images_base64

    def get_kinematic_plot_from_s3(self):
        kinematic_plot_path = os.path.join(self.get_kinematic_dir(), f'report_{self.patient_id}_{self.session_id}.png').replace("\\","/")
        image_base64 = False
        try:
            image_file = s3.get_object(Bucket=S3_BUCKET_NAME, Key=kinematic_plot_path)['Body'].read()
            image_base64 = base64.b64encode(image_file).decode('utf-8')
        except botocore.exceptions.ClientError as e:
            if e.response['Error']['Code'] == "404":
                print(f'kinematic plot does not exists {image_file}')
            else:
                print(e.response['Error'])

        return image_base64

    def set_session_folder_name(self, folder_name):
        self.session_folder_name = folder_name