# Generated by Django 3.1.5 on 2021-02-24 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0013_slideritem_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='source',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='source',
            name='priority',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='source',
            name='server',
            field=models.CharField(default='', max_length=128),
        ),
    ]
