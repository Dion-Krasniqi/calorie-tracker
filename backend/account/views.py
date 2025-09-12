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
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import *
# Create your views here.



User = get_user_model()

class UserRegisterAPI_view(generics.GenericAPIView):

     permission_classes = [AllowAny]

     serializer_class = UserRegistrationSerializer
     
     def post(self, request, *args, **kwargs):
          serializer = self.get_serializer(data=request.data)
          serializer.is_valid(raise_exception=True)
          user = serializer.save()
          token = RefreshToken.for_user(user)
          data = serializer.data
          data['tokens'] = {'refresh':str(token),
                            'access':str(token.access_token)}
          
          return Response(data, status=status.HTTP_201_CREATED)


class LoginAPI_view(generics.GenericAPIView):

     permission_classes = [AllowAny]
     serializer_class = UserLoginSerializer

     def post(self, request, *args, **kwargs):
          
          serializer = self.get_serializer(data=request.data)
          serializer.is_valid(raise_exception=True)
          user = serializer.validated_data
          serializer = UserSerializer(user)
          token = RefreshToken.for_user(user)
          data = serializer.data
          data['tokens'] = {'refresh':str(token),
                            'access':str(token.access_token)}

          return Response(data, status=status.HTTP_200_OK)

class LogoutAPI_view(generics.GenericAPIView):
    
    permission_classes = [IsAuthenticated]


    def post(self, request):
         try:
              refresh_token = request.data['refresh']
              token = RefreshToken(refresh_token)
              token.blacklist()
              return Response(status=status.HTTP_205_OK)
         except Exception as e:
              return Response({'error':e}, status=status.HTTP_400_BAD_REQUEST)






















class HomeAPI_view(generics.RetrieveUpdateAPIView):
     authentication_classes = [TokenAuthentication]
     permission_classes = [IsAuthenticated]
     queryset = User.objects.all()
     serializer_class = UserSerializer
     
     def get_object(self):
          return self.request.user

class ProfileAPI_view(APIView):
     authentication_classes = [TokenAuthentication]
     permission_classes = [IsAuthenticated]
     serializer_class = UserSerializer

     def get(self, request):
          data = {'username': self.request.user.username}
          data['expenditure'] = self.request.user.expenditure if self.request.user.expenditure is not None else 0

          return Response(data, status=status.HTTP_200_OK)