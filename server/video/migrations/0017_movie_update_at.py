# Generated by Django 3.1.5 on 2021-02-25 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0016_delete_source'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='update_at',
            field=models.DateField(auto_now=True),
        ),
    ]