from dotenv import load_dotenv
from flask import Flask, jsonify

load_dotenv()

app = Flask(__name__)

@app.route('/')
def landing():
    return jsonify(message="Test, OK"), 200

"""
get_s3_upload_file_link
get_s3_access_file_link
"""