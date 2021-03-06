# Generated by Django 3.2.2 on 2021-05-11 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0008_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='videopost',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='videopost',
            name='user',
        ),
        migrations.RemoveField(
            model_name='videopost',
            name='video_views',
        ),
        migrations.RenameField(
            model_name='media',
            old_name='name',
            new_name='title',
        ),
        migrations.AlterField(
            model_name='content',
            name='image',
            field=models.FileField(null=True, upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='media',
            name='audio',
            field=models.FileField(null=True, upload_to='audio/'),
        ),
        migrations.AlterField(
            model_name='media',
            name='text',
            field=models.FileField(default='None', upload_to='videos/subtitle/'),
        ),
        migrations.AlterField(
            model_name='media',
            name='video',
            field=models.FileField(null=True, upload_to='videos/'),
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='VideoPost',
        ),
    ]
