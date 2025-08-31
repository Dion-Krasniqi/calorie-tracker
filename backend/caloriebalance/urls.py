from django.urls import path
from . import views

urlpatterns = [
    path('log_food', views.log_food_view, name="log_food"),
    path('see_logs', views.see_logs_view, name="see_logs"),
    
]