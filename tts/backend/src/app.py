from dotenv import load_dotenv
from flask import Flask, jsonify, request
from src.lib.aws_s3 import create_presigned_upload_url
load_dotenv()

# FIXME: this needs to depend on user + date or some other thing.
app = Flask(__name__)


@app.route('/')
def landing():
    return jsonify(message="Test, OK"), 200


@app.route('/get_presigned_upload_link', methods=['POST'])
def get_presigned_upload_link():
    s3_bucket_object_key = request.json.get('s3_bucket_object_key')
    url_data = create_presigned_upload_url(s3_bucket_object_key)
    return jsonify(url_data=url_data), 200


"""
get_s3_upload_file_link
get_s3_access_file_link
"""