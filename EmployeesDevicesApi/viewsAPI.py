# all the methods called for react-axios rest-api
from rest_framework import viewsets  
from rest_framework.decorators import api_view
from .models import Employee,Device
from .serializers import EmployeeSerializer,DeviceSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


class EmployeesList(generics.ListCreateAPIView):# default-provided by rest framework of django, getAll---add a new one
    queryset =Employee.objects.all()
    serializer_class = EmployeeSerializer
    
class EmployeesDetail(generics.RetrieveUpdateDestroyAPIView):# default-provided by rest framework of django, getOne--editOne--deleteOne
    queryset =Employee.objects.all()
    serializer_class = EmployeeSerializer    
    
class DevicesList(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    
class DevicesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
