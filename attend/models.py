from django.db import models

class Users(models.Model):
    aid = models.AutoField(primary_key=True)
    addr = models.CharField(max_length=100)
    account = models.CharField(max_length=16)
    password = models.CharField(max_length=16)
    def __str__(self): #def __unicode__(self) 无效
        return  self.addr