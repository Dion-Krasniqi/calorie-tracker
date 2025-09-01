from django.urls import path
from . import views

urlpatterns = [
    path('log_food', views.log_food_view, name="log_food"),
    path('view_logs', views.see_logs_view, name="view_logs"),
    path('delete_logged_food/<int:logged_food_id>/', views.delete_logged_food, name="delete_logged_food"),
    
]