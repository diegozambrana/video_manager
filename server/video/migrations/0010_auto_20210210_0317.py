# Generated by Django 3.1.5 on 2021-02-10 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0009_auto_20210210_0316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='movies'),
        ),
    ]
