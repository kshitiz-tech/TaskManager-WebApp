from django.urls import path,include
from . import views




urlpatterns = [
    path("task/",views.TaskListCreateView.as_view(),name = 'task'),
    path("token/",views.MyTokenObtainPairView.as_view(),name = 'get_token'),
    path("task/delete/<int:pk>/",views.DeleteTaskView.as_view(),name = 'task_delete'),
    path("task/update/<int:pk>/",views.UpdateTaskView.as_view(),name = 'task_update')
    
]