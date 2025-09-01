from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password="None", **extra_fields):
    #    if not email:
    #        raise ValueError("You must enter an email!")
        if not username:
            raise ValueError("You must enter a username!")
        user = self.model(username=username, **extra_fields) # creates a new USER instance associated with this MANAGER
        user.set_password(password) 
        user.save(using=self._db)   # saves to correct database
        return user
    
    def create_superuser(self, username, password="None", **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True) # just fills optional extra_fields

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff set to True")
        

        return self.create_user(username, password, **extra_fields)




class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    expenditure = models.DecimalField(max_digits=9, decimal_places=2, blank=True, null=True) 

    objects = CustomUserManager() # links a CustomUser to a CustomUserManager
    
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
