from django.conf import settings
from contents.models import Content
from rest_framework import viewsets, permissions, status
from .serializers import ContentSerializer, MediaSerializer, YoutubeDataSerializer
from .models import Car, Media
from rest_framework.decorators import action
from rest_framework.response import Response
import os
import json

from django.conf import settings

from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse
from django.core.files.base import File
from django.conf import settings
from .engine import Audio, SpeechToText


class ContentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ContentSerializer

    def get_queryset(self):
        return self.request.user.contents.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MediaViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = MediaSerializer

    def get_queryset(self):
        return self.request.user.media.all()

    def list(self, request):
        medias = Media.objects.all()
        serializer = MediaSerializer(medias, many=True, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        medias_serializer = MediaSerializer(data=request.data)
        if medias_serializer.is_valid():
            medias_serializer.save(owner=request.user)
            return Response(medias_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", medias_serializer.errors)
            return Response(
                medias_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        queryset = Media.objects.all()
        media = get_object_or_404(queryset, pk=pk)
        serializer = MediaSerializer(media, context={"request": request})
        return Response(serializer.data)

    def download(request, id):
        obj = Media.objects.get(id=id)
        filename = obj.video.path
        print(filename)
        response = FileResponse(open(filename, "rb"))
        return response

    @action(detail=True, methods=["post"], url_path="transcribe")
    def transcribe(self, request, pk):
        queryset = Media.objects.all()
        media = get_object_or_404(queryset, pk=pk)
        stt = SpeechToText()
        if media.type == "video":
            audio_file = os.path.join(settings.MEDIA_ROOT, "audio.wav")
            print(audio_file)
            Audio(media.video.path, str(audio_file))
        else:
            audio_file = media.video.path
        with open(audio_file, "rb") as f:
            res = stt.recognize(
                audio=f,
                content_type="audio/wav",
                model="en-AU_NarrowbandModel",
                continuous=True,
                timestamps=True,
            ).get_result()
        text = [result["alternatives"][0]["timestamps"] for result in res["results"]]
        test = [
            result["alternatives"][0]["transcript"].rstrip() + "."
            for result in res["results"]
        ]
        full_text = [para[0].title() + para[1:] for para in test]

        data_list = list()
        for t in text:
            data_list += t

        f = open("data.json", "w+")
        json.dump(data_list, f, ensure_ascii=False, indent=2)

        full_text_file = open("full_text.txt", "w+")
        full_text_file.writelines(full_text)
        media.text.save("data", File(f))
        media.full_text.save("full.txt", File(full_text_file))
        serializer = MediaSerializer(media, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class YoutubeViewSet(viewsets.ModelViewSet):
    serializer_class = YoutubeDataSerializer

    def get_queryset(self):
        return self.request.user.media.all()

    @action(detail=True, methods=["get"], url_path="get_transcript")
    def get_transcript(self, request, pk):
        queryset = Media.objects.all()
        media = get_object_or_404(queryset, pk=pk)
        stt = SpeechToText()
        if media.type == "video":
            audio_file = os.path.join(settings.MEDIA_ROOT, "audio.wav")
            print(audio_file)
            Audio(media.video.path, str(audio_file))
        else:
            audio_file = media.video.path
        with open(audio_file, "rb") as f:
            res = stt.recognize(
                audio=f,
                content_type="audio/wav",
                model="en-AU_NarrowbandModel",
                continuous=True,
                timestamps=True,
            ).get_result()
        text = [result["alternatives"][0]["timestamps"] for result in res["results"]]
        data_list = list()
        for t in text:
            data_list += t

        f = open("datawW.json", "w+")
        json.dump(data_list, f, ensure_ascii=False, indent=2)
        media.text.save("data", File(f))
        serializer = MediaSerializer(media, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)
