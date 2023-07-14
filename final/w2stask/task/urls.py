from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt import views as jwt_views

from .views import *
# from .tests import *

urlpatterns = [
    path('register/', AuthUserRegistrationView.as_view(), name='register'),
    path('login/', AuthUserLoginView.as_view(), name='login'),
    path('Task_get_post/', TaskApiView.as_view(), name='TaskApiView_get_post'),
    path('Task_upt_dlt/<int:Pk>/', TaskApiView.as_view(), name='Task_upt_dlt'),
    path('emp_name/', emp_name.as_view(), name='emp_name'),
    path('emp_uni_task/', emp_uni_task.as_view(), name='emp_uni_task'),
    path('dash_user_count/', dash_user_count.as_view(), name='dash_user_count'),
    path('sheculeTASK/', sheculeTASK.as_view(), name='sheculeTASK'),


]