
from django.contrib import admin
from django.urls import path,include
from task.views import CreateUser
from task.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/',CreateUser.as_view(),name = 'register'),
    path("api/token/refresh",TokenRefreshView.as_view(),name = 'refresh_token'),
    path("api-auth/",include('rest_framework.urls')),
    path("api/",include('task.urls'))
]
