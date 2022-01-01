# all the methods called for react-axios rest-api
from rest_framework import viewsets  
from rest_framework.decorators import api_view
from .models import Employee,Device,Upload
from .serializers import EmployeeSerializer,DeviceSerializer ,UploadSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import Http404,JsonResponse
from rest_framework import status
from datetime import datetime
from django.core import serializers


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
    
    
class image_upload(APIView):
    def get(self, request): 
        allUpload=list(Upload.objects.values())
        return JsonResponse(allUpload,safe=False)
    def post(self, request): 
        employee=request.data['employee_id']
        image_file = request.FILES['image_file']
        emp=Employee.objects.get(pk=employee);
        upload = Upload(employee=emp,image=image_file)
        upload.save()
        image_url = upload.image.url
        return JsonResponse({'image_url':image_url,'employee_id':emp.id})
    def put(self, request): 
        employee=request.data['employee_id']
        image_file = request.FILES['image_file']
        emp=Employee.objects.get(pk=employee);
        upload = Upload(employee=emp,image=image_file,uploaded_at=datetime.now())
        upload.save()
        image_url = upload.image.url
        return JsonResponse({'image_url':image_url,'employee_id':emp.id})
    
class image_upload_one(APIView):
    def get(self, request,id): 
        uploadOne=list(Upload.objects.filter(pk=id).values())
        return JsonResponse(uploadOne,safe=False)
      
    
    