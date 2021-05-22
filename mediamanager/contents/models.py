from django.db import models
from django.contrib.auth.models import User
from s3direct.fields import S3DirectField


class Car(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    year_of_manufacture = models.CharField(max_length=255, blank=False, null=False)
    price = models.CharField(max_length=255, blank=False, null=False)
    image = S3DirectField(dest="primary_destination", blank=True)
    video = S3DirectField(dest="primary_destination", blank=True)

    def __str__(self):
        return f"{self.name} ({self.year_of_manufacture}) - {self.price}"


class Content(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    image = models.FileField(upload_to="images/", null=True)
    owner = models.ForeignKey(
        User, related_name="contents", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Media(models.Model):
    AVAILABLE_TYPES = [
        ("video", "video"),
        ("audio", "audio"),
    ]
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=5, choices=AVAILABLE_TYPES, default="video")
    audio = models.FileField(upload_to="audio/", null=True)
    video = models.FileField(upload_to="videos/", null=True)
    text = models.FileField(upload_to="videos/subtitle/", null=True)
    full_text = models.FileField(upload_to="texts/", null=True)
    owner = models.ForeignKey(
        User, related_name="media", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.created_at}) - {self.owner}"


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    about = models.TextField()
    profile_pic = models.ImageField(upload_to="pic/", default="pic/default.jpg")
    subscribers = models.ManyToManyField(User, related_name="subscribers")


class YoutubeData(models.Model):
    url = models.URLField
    text = models.FileField(upload_to="videos/youtube/", null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.url} ({self.created_at})"
