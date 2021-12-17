from rest_framework import serializers
from .models import Employee,Device

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id','name','email')
        
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields=('id','serial_number','description','type','owner')