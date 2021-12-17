# all the urls of rest api for react-axios calls, the name here are to describe the method called
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import viewsAPI

urlpatterns = [
    
    path('employees', viewsAPI.EmployeesList.as_view()),
    path('employees/<int:pk>/',viewsAPI.EmployeesDetail.as_view()),
    
    path('devices',viewsAPI.DevicesList.as_view()),
    path('devices/<int:pk>/', viewsAPI.DevicesDetail.as_view()),
  
]
