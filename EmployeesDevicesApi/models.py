from django.db import models

# Create your models here.
from django.core.validators import MinLengthValidator



def validateMinLength(value):
    if value % 2 != 0:
        raise MinLengthValidator(3,'3 length is minimum')

class Employee(models.Model):
    name = models.CharField(max_length=255, unique=True,
                            validators=[MinLengthValidator(3)])
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.name+' '+ self.email


class Device(models.Model):
    serial_number = models.CharField(max_length=255,unique=True)
    description = models.CharField(max_length=255,blank=False,null=False)
    type = models.IntegerField(null=True)
    owner = models.ForeignKey(Employee, blank=True, null=True, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.serial_number)+' '+ self.description+' '+ str(self.type)+' '+ str(self.owner)


