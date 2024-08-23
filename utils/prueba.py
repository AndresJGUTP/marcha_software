import boto3
import os
import base64
s3 = boto3.client('s3')

attacheds_path = '/dev/123456789/session_2/attacheds/images'
images_base64 = []

S3_BUCKET_NAME = 'marcha-storage'

s3_list_objects = s3.list_objects(Bucket=S3_BUCKET_NAME, Prefix=attacheds_path.rstrip('/')+'/')['Contents']
for dict_result in s3_list_objects:
    image_name = dict_result['Key']
    print(image_name)
    if image_name.endswith(('.png', '.jpg', '.jpeg')):
        image_path = os.path.join(attacheds_path, image_name).replace("\\","/")
        image_file = s3.get_object(Bucket=S3_BUCKET_NAME, Key=image_path)['Body'].read()
        encoded_string = base64.b64encode(image_file).decode('utf-8')
        images_base64.append(encoded_string)