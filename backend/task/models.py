from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    context = models.TextField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    stat = models.BooleanField(default=False)
    owner = models.ForeignKey(User,related_name='tasks',on_delete=models.CASCADE)
    due = models.DateField(auto_now_add= False,null= True)

    def __str__(self):
        return self.title
    

