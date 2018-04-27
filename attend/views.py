import sys
import threading
import time
import datetime
import json
import base64
import os
import cv2 as cv
import numpy as np
import uuid
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from dwebsocket import require_websocket
from django.http import HttpResponse, HttpResponseRedirect
from . import  models
from django.views.decorators.csrf import csrf_exempt

# 页面
def login(request):
    return render(request,'login.html')

#@login_required
def index(request):
    return  render(request,'index.html')


def members(request):
    return render(request,'members.html')

def record(request):
    return render(request,'record.html')

def setting(request):
    return render(request,'setting.html')

def department(request):
    return render(request,'department.html')

def report(request):
    return render(request,'report.html')

def rule(request):
    return render(request,'rule.html')

def test(request):
    return render(request,'test.html')

# 方法
def doLogin(request):
    account = request.POST.get('account','account')
    password = request.POST.get('password','password')
    user = models.Users.objects.filter(account=account)
    if len(user) <= 0:
        return render(request, 'login.html', {'error': '账号不存在！'})
    elif password == user[0].password:
        return  render(request,'index.html',{'user':user[0]})
    else:
        return render(request,'login.html',{'error':'密码错误！'})

def settingData(request):
   pass

@csrf_exempt
def img(request):
    base_code = request.POST.get("photo").split(',', 1)[1]
    debase = base64.b64decode(base_code)
    nparr = np.fromstring(debase, np.uint8)
    img = cv.imdecode(nparr, cv.IMREAD_COLOR)
    img_name_time = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
    img_name = "attend/img/"+img_name_time.replace(' ','_')+".jpg"
    cv.imwrite(img_name, img)
    data = {
        "status": 2,
        "pic": '',
        "name": 4,
    }
    return HttpResponse(json.dumps(data), content_type="application/json")
