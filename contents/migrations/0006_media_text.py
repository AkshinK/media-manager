# Generated by Django 3.2.2 on 2021-05-11 12:09

from django.db import migrations
import s3direct.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0005_media'),
    ]

    operations = [
        migrations.AddField(
            model_name='media',
            name='text',
            field=s3direct.fields.S3DirectField(blank=True),
        ),
    ]