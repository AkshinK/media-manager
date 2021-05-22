from ibm_watson import SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from moviepy.editor import *
from django.conf import settings


def SpeechToText():
    apikey = settings.API_KEY
    url = settings.URL
    authenticator = IAMAuthenticator(apikey)
    stt = SpeechToTextV1(authenticator=authenticator)
    stt.set_service_url(url)
    return stt


def Audio(video, audio_file):
    video = VideoFileClip(video)
    audio = video.audio  # 3.
    audio.write_audiofile(audio_file)
