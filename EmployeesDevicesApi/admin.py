from django.contrib import admin

# Register your models here.
from .models import Employee,Device,Upload


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    fields = ('name', 'email')
    list_display = ('id', 'name', 'email')

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    fields = ('serial_number', 'description', 'type', 'owner')
    list_display=('id','serial_number','description','type','owner') 
    
    
@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    fields = ('image', 'employee')
    list_display=('image', 'uploaded_at', 'employee') 