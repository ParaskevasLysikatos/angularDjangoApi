from rest_framework import serializers
from .models import Employee,Device ,Upload

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id','name','email')
        
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields=('id','serial_number','description','type','owner')
        

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields=('image', 'uploaded_at', 'employee')