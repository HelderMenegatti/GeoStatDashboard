# Generated by Django 4.2.8 on 2024-05-25 06:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='counties',
            old_name='nome',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='counties',
            old_name='estado',
            new_name='state',
        ),
        migrations.RenameField(
            model_name='state',
            old_name='nome',
            new_name='name',
        ),
    ]