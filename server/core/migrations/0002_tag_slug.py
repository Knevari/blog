# Generated by Django 3.1.4 on 2020-12-15 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='slug',
            field=models.SlugField(default=None, verbose_name='tag slug'),
        ),
    ]