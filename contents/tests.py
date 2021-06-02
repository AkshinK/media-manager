import unittest
from django.test import TestCase
from django.urls import reverse
from contents.models import Media, Content
from django.utils import timezone
from contents.views import MediaViewSet


class MediaTest(TestCase):
    def create_media(self, title="test_title", type="audio"):
        return Media.objects.create(title=title, type=type, created_at=timezone.now())

    def test_media_creation(self):
        med = self.create_media()

        self.assertTrue(isinstance(med, Media))
        self.assertEqual(
            med.__str__(), f"{med.title} ({med.created_at}) - None")

class ContentTest(TestCase):
    def create_content(self, name="test_name", email="test@test.com", message="Test message"):
        return Content.objects.create(name=name, email=email, message=message, created_at=timezone.now())

    def test_content_creation(self):
        content = self.create_content()

        self.assertTrue(isinstance(content, Content))
        self.assertEqual(
            content.__str__(), f"{content.name} ({content.email}, {content.message}) - None")
