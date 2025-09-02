from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from .forms import CustomRegistrationForm, CustomLoginForm, ProfileForm 
from .models import CustomUser
# Create your views here.


class CustomRegisterView(CreateView):
    model = CustomUser
    form_class = CustomRegistrationForm
    template_url = "account/register.html"
    success_url = reverse_lazy("login")

class CustomLoginView(LoginView):
    template_name = "account/login.html"
    authentication_form = AuthenticationForm

class CustomLogoutView(LogoutView):
    next_page = "/"

@login_required
def home(request):
    user = request.user
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
            form = ProfileForm(instance=user)

    return render(request, "account/profile.html", {'form':form})

    # return HttpResponse('This will redirect you to dashboard/main page')

    
