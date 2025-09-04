from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from django.contrib.auth import login, authenticate, logout, get_user_model
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

from .forms import CustomRegistrationForm, CustomLoginForm, ProfileForm 
from .models import CustomUser
from .serializers import UserSerializer
# Create your views here.



User = get_user_model()
class RegisterAPI_view(generics.CreateAPIView):
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [AllowAny]

     def perform_create(self,seralizer):
          user = seralizer.save()
          Token.objects.create(user=user)


class LoginAPI_view(APIView):
     permission_classes = [AllowAny]

     def post(self, request):
          
          user = authenticate(
               request,
               username = request.data.get('username'),
               password = request.data.get('password')
          )

          if user:
               token, created = Token.objects.get_or_create(user=user)
               return Response({"token":token.key})
          return Response({"error":"Invalid credentials"}, status=status.HTTP_404_BAD_REQUEST)


class LogoutAPI_view(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
         try:
              request.user.auth_token.delete()
              return Response(status=status.HTTP_200_OK)
         except:
              return Response({"status":"Logout failed"}, status=status.HTTP_404_BAD_REQUEST)

class HomeAPI_view(generics.RetrieveUpdateAPIView):
     authentication_classes = [TokenAuthentication]
     permission_classes = [IsAuthenticated]
     queryset = User.objects.all()
     serializer_class = UserSerializer
     
     def get_object(self):
          return self.request.user
