from django.contrib import admin

# Register your models here.
from .models import Employee,Device

@admin.register(Employee)
class DeviceAdmin(admin.ModelAdmin):
    fields = ('name', 'email')
    list_display = ('id', 'name', 'email')

@admin.register(Device)
class EmployeeAdmin(admin.ModelAdmin):
    fields = ('serial_number', 'description', 'type', 'owner')
    list_display=('id','serial_number','description','type','owner') 