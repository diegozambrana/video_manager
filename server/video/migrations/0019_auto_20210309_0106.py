# Generated by Django 3.1.5 on 2021-03-09 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0018_show_update_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='ads_url',
            field=models.CharField(default='', max_length=56),
        ),
        migrations.AddField(
            model_name='movie',
            name='ads_url',
            field=models.CharField(default='', max_length=56),
        ),
        migrations.AddField(
            model_name='show',
            name='ads_url',
            field=models.CharField(default='', max_length=56),
        ),
    ]
