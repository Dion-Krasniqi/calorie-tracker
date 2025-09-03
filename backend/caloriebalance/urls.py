from django.urls import path
from . import views

urlpatterns = [
    path('', views.view_dashboard, name="dashboard"),
    path('log_food', views.log_food_view, name="log_food"),
    path('view_logs', views.see_logs_view, name="view_logs"),
    path('delete_logged_food/<int:logged_food_id>/', views.delete_logged_food, name="delete_logged_food"),

    path('api/logs/', views.LoggedFoodListAPI_view.as_view(), name="api_logs_list"),
    path('api/add/', views.LogFoodAPI_view.as_view(), name="api_add_food"),
    path('api/deletelog/<int:pk>/', views.DeleteLogAPI_view.as_view(), name="api_delete_log"),

    path('home/', views.DashboardAPI_view.as_view(), name="home")
    
]