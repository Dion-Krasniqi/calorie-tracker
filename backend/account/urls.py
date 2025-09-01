from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('register', views.CustomRegisterView.as_view(template_name="account/register.html"), name="register"),
    path('login', views.CustomLoginView.as_view(template_name="account/login.html"), name="login"),
    path('logout', views.CustomLogoutView.as_view(next_page="login"), name="logout")
]