import unittest
# from tastypie.test import ResourceTestCase
# from selenium import webdriver
from django.test import TestCase
from django.urls import reverse
from contents.models import Media
from django.utils import timezone
from contents.views import MediaViewSet
# pip install coverage
# from .forms import WhateverForm
# models test


class MediaTest(TestCase):
    def create_media(self, title="test_title", type="audio"):
        return Media.objects.create(title=title, type=type, created_at=timezone.now())

    def test_media_creation(self):
        med = self.create_media()

        self.assertTrue(isinstance(med, Media))
        self.assertEqual(
            med.__str__(), f"{med.title} ({med.created_at}) - None")

# # forms

#         def test_valid_form(self):
#             w = Whatever.objects.create(title='Foo', body='Bar')
#             data = {'title': w.title, 'body': w.body, }
#             form = WhateverForm(data=data)
#             self.assertTrue(form.is_valid())

#         def test_invalid_form(self):
#             w = Whatever.objects.create(title='Foo', body='')
#             data = {'title': w.title, 'body': w.body, }
#             form = WhateverForm(data=data)
#             self.assertFalse(form.is_valid())

# # views (uses selenium)


# class TestSignup(unittest.TestCase):

#     def setUp(self):
#         self.driver = webdriver.Firefox()

#     def test_signup_fire(self):
#         self.driver.get("http://localhost:8000/add/")
#         self.driver.find_element_by_id('id_title').send_keys("test title")
#         self.driver.find_element_by_id('id_body').send_keys("test body")
#         self.driver.find_element_by_id('submit').click()
#         self.assertIn("http://localhost:8000/", self.driver.current_url)

#     def tearDown(self):
#         self.driver.quit


# if __name__ == '__main__':
#     unittest.main()

# # api


# class EntryResourceTest(ResourceTestCase):

#     def test_get_api_json(self):
#         resp = self.api_client.get('/api/whatever/', format='json')
#         self.assertValidJSONResponse(resp)

#     def test_get_api_xml(self):
#         resp = self.api_client.get('/api/whatever/', format='xml')
#         self.assertValidXMLResponse(resp)

# # model mommy


# class WhateverTestMommy(TestCase):

#     def test_whatever_creation_mommy(self):
#         what = mommy.make(Whatever)
#         self.assertTrue(isinstance(what, Whatever))
#         self.assertEqual(what.__unicode__(), what.title)
