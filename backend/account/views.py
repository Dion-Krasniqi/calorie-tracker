from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView

from .forms import CustomRegistrationForm, CustomLoginForm 
from .models import CustomUser
# Create your views here.

def home(request):
    return HttpResponse('This will redirect you to dashboard/main page')

class CustomRegisterView(CreateView):
    model = CustomUser
    form_class = CustomRegistrationForm
    template_url = "account/register.html"
    success_url = reverse_lazy("login")

class CustomLoginView(LoginView):
    template_name = "account/login.html"
    authentication_form = CustomLoginForm

class CustomLogoutView(LogoutView):
    next_page = "/"