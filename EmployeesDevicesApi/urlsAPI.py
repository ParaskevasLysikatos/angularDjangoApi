# all the urls of rest api for react-axios calls, the name here are to describe the method called
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import viewsAPI

urlpatterns = [
    
    path('employees', viewsAPI.EmployeesList.as_view()),
    path('employees/<int:pk>/',viewsAPI.EmployeesDetail.as_view()),
    
    path('devices',viewsAPI.DevicesList.as_view()),
    path('devices/<int:pk>/', viewsAPI.DevicesDetail.as_view()),
    
    
    path('image',viewsAPI.image_upload.as_view(),name="Get for all without image url,POST for create employee ,requires__ image_file and employee_id returns image_url and employee_id"),
    path('image/<int:id>/',viewsAPI.image_upload_one.as_view(),name="Get one without image url,PUT for edit but requires__ image_file and returns image_url and employee_id ")
    

]
