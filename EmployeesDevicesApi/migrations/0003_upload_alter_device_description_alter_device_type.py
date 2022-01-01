# Generated by Django 4.0 on 2021-12-31 12:08

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeesDevicesApi', '0002_alter_device_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Upload',
            fields=[
                ('employee', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='EmployeesDevicesApi.employee')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.AlterField(
            model_name='device',
            name='description',
            field=models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(3)]),
        ),
        migrations.AlterField(
            model_name='device',
            name='type',
            field=models.IntegerField(default=None),
            preserve_default=False,
        ),
    ]