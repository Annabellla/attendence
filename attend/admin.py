from django.contrib import admin

#from models import Users 报错
from .models import *

admin.site.register(Users)