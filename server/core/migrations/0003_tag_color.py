# Generated by Django 3.1.4 on 2020-12-15 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_tag_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='color',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='tag title'),
        ),
    ]