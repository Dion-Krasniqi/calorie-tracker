from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from django.contrib.auth import login, authenticate, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .forms import CustomRegistrationForm, CustomLoginForm, ProfileForm 
from .models import CustomUser
# Create your views here.


class CustomRegisterView(CreateView):
    model = CustomUser
    form_class = CustomRegistrationForm
    template_url = "account/register.html"
    success_url = reverse_lazy("login")

# class CustomLoginView(LoginView):
#    template_name = "account/login.html"
#    authentication_form = AuthenticationForm

class LoginAPI_view(APIView):
     def post(self, request):
          
          user = authenticate(
               request,
               username = request.data.get('username'),
               password = request.data.get('password')
          )

          if user:
               login(request, user)
               return Response({"status":"Logged in"})
          return Response({"error":"Invalid credentials"}, status=400)
     

# class CustomLogoutView(LogoutView):
#    next_page = "/"

class LogoutAPI_view(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
         logout(request)
         return Response({"status":"Logged out"})



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

    
