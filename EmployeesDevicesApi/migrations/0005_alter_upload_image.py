# Generated by Django 4.0 on 2021-12-31 13:08

import EmployeesDevicesApi.storage_backends
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeesDevicesApi', '0004_alter_upload_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='image',
            field=models.FileField(storage=EmployeesDevicesApi.storage_backends.PublicMediaStorage(), upload_to=''),
        ),
    ]