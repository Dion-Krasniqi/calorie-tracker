from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.
class CustomAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    fieldsets = (
        (None, {"fields":("email", "username", "password",)},),
        ("Permissions", {"fields":("is_staff", "is_active", "is_superuser", "groups", "user_permissions"),}),
        ("Important dates", {"fields":("last_login",)}),
    )
    add_fieldsets = (
        (None, {"classes":("wide",), "fields":("email", "username", "password1", "password2", "is_active")}),
    )
    search_fields = ("username",)
    ordering = ("username",)

admin.site.register(CustomUser, CustomAdmin)