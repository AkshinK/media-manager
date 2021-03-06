# Generated by Django 3.2.2 on 2021-05-11 18:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contents', '0006_media_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('desc', models.TextField()),
                ('video_file', models.FileField(upload_to='videos/')),
                ('thumbnail', models.ImageField(default='none', upload_to='videos/thumbnail/')),
                ('category', models.CharField(default='none', max_length=50)),
                ('pub_date', models.DateField(auto_now_add=True)),
                ('likes', models.ManyToManyField(related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video_views', models.ManyToManyField(related_name='video_views', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('about', models.TextField()),
                ('profile_pic', models.ImageField(default='pic/default.jpg', upload_to='pic/')),
                ('subscribers', models.ManyToManyField(related_name='subscribers', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
