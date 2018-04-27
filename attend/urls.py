from django.urls import path
from . import views
app_name='[attend]'
urlpatterns = [
    path('index', views.index , name='index'),
    path('login', views.login , name='login'),
    path('login/doLogin', views.doLogin , name='doLogin'),
    path('members', views.members, name='members'),
    path('record', views.record, name='record'),
    path('report', views.report, name='report'),
    path('rule', views.rule, name='rule'),
    path('setting', views.setting, name='setting'),
    path('department', views.department, name='department'),
    path('ajax/settingData', views.settingData, name='settingData'),
    path('test', views.test, name='test'),
    #path('test/socket', views.socket, name='socket'),
    # 打卡
    path('ajax/img', views.img, name='img')
]
