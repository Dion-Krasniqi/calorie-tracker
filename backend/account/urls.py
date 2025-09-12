from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('register/', views.UserRegisterAPI_view.as_view(), name="register"),

    path('login/', views.LoginAPI_view.as_view(), name="login"),
    path('logout/', views.LogoutAPI_view.as_view(), name="logout"),

    path('api/profile/', views.ProfileAPI_view.as_view(), name='get-profile-api'),

    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]