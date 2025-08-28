from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password="None", **extra_fields):
        if not email:
            raise ValueError("You must enter an email address!")
        if not username:
            raise ValueError("You must enter a username!")
        email = self.normalize_email(email) # lowercases 2nd part of email, to ensure no 2x
        user = self.model(email=email, username=username, **extra_fields) # creates a new USER instance associated with this MANAGER
        user.set_password(password) 
        user.save(using=self._db)   # saves to correct database
    
    def create_superuser(self, email, username, password="None", **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True) # just fills optional extra_fields

        return self.create_user(email, username, password, **extra_fields)




class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True)
    email = models.EmailField(unique=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  

    objects = CustomUserManager() # links a CustomUser to a CustomUserManager
    
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
