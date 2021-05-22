from django.contrib import admin

# Register your models here.
from .models import Car
from .models import Content, Media, UserData

admin.site.register(Car)
admin.site.register(Content)
admin.site.register(Media)
admin.site.register(UserData)
