from typing import Dict, List, Literal, Tuple, TypedDict
import os
import requests

Model = Literal["tiny", "base", "small", "medium", "large-v1", "large-v2"]
JobStatus = Literal['IN_PROGRESS', 'COMPLETED', 'ERROR', 'IN_QUEUE', 'FAILED']
Transcript = List[TypedDict(
    'TranscriptSegment', {'start': float, 'end': float, 'text': str})]

RUNPOD_API_KEY = os.getenv("RUNPOD_API_KEY")


def submit_audio(audio_request_response: requests.Response) -> Tuple[bool, str, str]:
    """ Submit audio to Runpod whisper API for transcription.

    Args:
        audio_request_response (requests.Response): The response from the audio request.

    Returns:
        bool: Whether the audio was successfully submitted.
        str: Resulting job ID if successful. (Empty string if failed.)
        str: Reason for failure if any. (Empty string if successful.)
    """
    if audio_request_response.status_code != 200:
        return False, '', audio_request_response.text
    return True, audio_request_response.json()['id'], ''


def get_task_status(result_request_response: requests.Response) -> JobStatus:
    """Get the status of the task from the result request response.

    Args:
        result_request_response (requests.Response): The response from the result request.

    Returns:
        JobStatus: The status of the task.
    """
    # FIXME: Handle task failure.
    if result_request_response.status_code != 200:
        return 'ERROR'

    match result_request_response.json()['status']:
        case 'COMPLETED':
            return 'COMPLETED'
        case 'IN_PROGRESS':
            return 'IN_PROGRESS'
        case 'IN_QUEUE':
            return 'IN_QUEUE'
        case 'FAILED':
            return 'FAILED'

    raise ValueError(f'Unknown task status, {result_request_response.json()}')


def get_transcription(result_request_response: requests.Response) -> Transcript | None:
    """Get the transcription from the result request response.

    Args:
        result_request_response (requests.Response): The response from the result request.

    Returns:
        Transcript | None: The transcription of the audio if completed, else None.
    """
    if result_request_response.status_code != 200:
        return None
    if get_task_status(result_request_response) != 'COMPLETED':
        return None

    segments = result_request_response.json()['output']['segments']
    transcript: List[Dict[str, int | float | str]] = [{
        'start': s['start'],
        'end': s['end'],
        'text': s['text']}
        for s in segments]

    return transcript


def submit_audio_request(wav_file_url: str, model_name: Model = 'base') -> requests.Response:
    """Submit audio to Runpod whisper API for transcription.

    Args:
        wav_file_url (str): The download URL of the audio file (.wav) to be transcribed.
        model_name (Model, optional): The model to be used for transcription. Defaults to 'base'.

    Returns:
        requests.Response: The response from the API.
    """
    url = "https://api.runpod.ai/v2/faster-whisper/run"
    payload = {
        "input": {
            "audio": wav_file_url,
            "model": model_name,
            "transcription": "plain_text",
            "translate": False,
            # "language": "en",
            "temperature": 0,
            "best_of": 5,
            "beam_size": 5,
            "patience": 1,
            "suppress_tokens": "-1",
            "condition_on_previous_text": False,
            "temperature_increment_on_fallback": 0.2,
            "compression_ratio_threshold": 2.4,
            "logprob_threshold": -1,
            "no_speech_threshold": 0.6,
            "word_timestamps": False
        },
        "enable_vad": False
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": RUNPOD_API_KEY
    }

    return requests.post(url, json=payload, headers=headers)


def submit_result_request(job_id: str) -> requests.Response:
    """Submit a request to get the result of the transcription task.

    Args:
        job_id (str): The job ID of the transcription task.

    Returns:
        requests.Response: The response from the API.

    """
    url = f"https://api.runpod.ai/v2/faster-whisper/status/{job_id}"

    headers = {
        "accept": "application/json",
        "authorization": RUNPOD_API_KEY
    }

    return requests.get(url, headers=headers)
