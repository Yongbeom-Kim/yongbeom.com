import os
from pathlib import Path
from dotenv import load_dotenv
import pytest
from src.lib.aws_s3 import (
    create_presigned_download_url,
    create_presigned_upload_url,
    list_buckets,
    upload_file,
    item_exists,
    delete_item
)
import requests

load_dotenv()


@pytest.fixture
def test_file():
    item_path = Path('test/audio/audio_gettysburg.wav')
    item_key = 'test.wav'
    assert item_path.exists()
    assert item_path.is_file()
    upload_file(item_path, item_key)
    yield item_key
    delete_item(item_key)


def test_env_var():
    assert 'AWS_REGION' in os.environ


def test_list_buckets():
    assert os.environ['AWS_S3_AUDIO_BUCKET_NAME'] in list_buckets()


# Super bad test, but it's fine...
# If this test fails halfway, we are left with a dangling file in the bucket
def test_upload_and_delete_file():
    item_path = Path('test/audio/audio_gettysburg.wav')
    item_key = 'test.wav'
    assert item_path.exists()
    assert item_path.is_file()
    assert not item_exists(item_key)
    upload_file(item_path, item_key)
    try:
        assert item_exists(item_key)
    finally:
        delete_item(item_key)
        assert not item_exists(item_key)


def test_create_presigned_download_url(test_file):
    url = create_presigned_download_url(test_file)
    assert url is not None
    assert "https://" in url
    assert os.environ['AWS_S3_AUDIO_BUCKET_NAME'] in url
    assert test_file in url
    response = requests.get(url)
    assert response.status_code == 200


def test_create_presigned_upload_url():
    item_path = Path('test/audio/audio_gettysburg.wav')
    item_key = 'test.wav'
    url_obj = create_presigned_upload_url(object_name=item_key)
    assert url_obj is not None
    try:
        with open(item_path, 'rb') as f:
            files = {'file': (item_path.as_posix(), f)}
            response = requests.post(url_obj['url'], data=url_obj['fields'], files=files)
            assert response.status_code == 204
            assert item_exists(item_key)
    finally:    
        delete_item(item_key)
        assert not item_exists(item_key)
    assert False