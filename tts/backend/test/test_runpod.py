from time import sleep
import pytest
from src.lib.runpod import (
    submit_audio,
    get_task_status,
    get_transcription,
    submit_audio_request,
    submit_result_request,
)
from test.runpod_response import (
    status_response_error,
    status_response_in_progress,
    status_response_complete,
)

from test.utils import create_http_response

sample_audio_url = 'https://github.com/runpod-workers/sample-inputs/raw/main/audio/gettysburg.wav'


@pytest.mark.fast
def test_submit_audio_success():
    response = create_http_response(
        200, {"id": "test-submission-job-id", "status": "IN_QUEUE"})
    assert submit_audio(response)[0]
    assert submit_audio(response)[1]
    assert not submit_audio(response)[2]


@pytest.mark.fast
@pytest.mark.parametrize("status_code", [(400,), (401,), (429,)])
def test_submit_audio_fail(status_code):
    response = create_http_response(
        status_code, {"error": "test-error-message"})
    assert not submit_audio(response)[0]
    assert not submit_audio(response)[1]
    assert submit_audio(response)[2]


@pytest.mark.fast
def test_get_task_status_error():
    assert get_task_status(status_response_error) == 'ERROR'


@pytest.mark.fast
def test_get_task_status_in_progress():
    assert get_task_status(status_response_in_progress) == 'IN_PROGRESS'


@pytest.mark.fast
def test_get_task_status_completed():
    assert get_task_status(status_response_complete) == 'COMPLETED'


@pytest.mark.fast
def test_get_transcription_error():
    assert get_transcription(status_response_error) is None


@pytest.mark.fast
def test_get_transcription_in_progress():
    assert get_transcription(status_response_in_progress) is None


@pytest.mark.fast
def test_get_transcription_complete():
    assert get_transcription(status_response_complete) != ""


@pytest.mark.slow
def test_submit_audio_request_success():
    response = submit_audio_request(sample_audio_url, 'tiny')
    assert response.status_code == 200


@pytest.mark.slow
def test_submit_audio_request_not_url():
    response = submit_audio_request('not_url', 'tiny')
    assert response.status_code == 200


@pytest.mark.slow
def test_submit_result_request_invalid_id():
    response = submit_result_request('test-job-id')
    assert response.status_code == 404


@pytest.mark.slow
def test_submit_result_request():
    success, id, error = submit_audio(submit_audio_request(sample_audio_url, 'tiny'))
    assert success
    assert get_task_status(submit_result_request(id)) in ('IN_PROGRESS', 'IN_QUEUE')

    sleep(10)
    assert get_task_status(submit_result_request(id)) == 'COMPLETED'
