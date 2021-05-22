from rest_framework import serializers
from contents.models import Content, Media, YoutubeData

# Lead Serializer
class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = "__all__"


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = "__all__"


class YoutubeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeData
        fields = "__all__"
