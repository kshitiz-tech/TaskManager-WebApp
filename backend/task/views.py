from django.shortcuts import render
from task.models import Task
from rest_framework import viewsets
from task.serializer import TaskSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import generics
from task.serializer import MyTokenObtainPairSerializer


# Create your views here.

#for creating user 
class CreateUser(generics.CreateAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes =[permissions.AllowAny]

#for listing and creating the tasks
class TaskListCreateView(generics.ListCreateAPIView):
    
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    #connecting the tasks to its user by getting the queryset first
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(owner = user)
    
    #obstructing the default perform create and if valid adding the user to the task
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner  = self.request.user)
        else:
            print(serializer.errors)


#using destroyapiview for deleting the task 
class DeleteTaskView(generics.DestroyAPIView):
    queryset = Task
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        pk = self.kwargs.get("pk")
        user = self.request.user
        return Task.objects.get(owner=user, pk=pk)
    
    '''
    def get_queryset(self,pk):
        user = self.request.user
        return Task.objects.filter(owner = user, pk = pk)'''
    


class UpdateTaskView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer

    def get_object(self):
        pk = self.kwargs.get("pk")
        user = self.request.user
        return Task.objects.get(owner=user, pk=pk)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(owner = self.request.user)
        else:
            print(serializer.errors)
    

from rest_framework_simplejwt.views import TokenObtainPairView
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
