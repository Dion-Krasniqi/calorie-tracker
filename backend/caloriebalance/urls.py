from django.urls import path
from . import views

urlpatterns = [
    

    path('api/logs/', views.LoggedFoodListAPI_view.as_view(), name="api_logs_list"),
    path('api/logs/today/', views.DailyLoggedFoodAPI_view.as_view(), name="api_logs_day"),
    path('api/add/', views.LogFoodAPI_view.as_view(), name="api_add_food"),
    path('api/logs/<int:pk>/', views.LoggedFoodDetailAPI_view.as_view(), name="api_logs_detail"),


    path('api/foodlist/', views.FoodListAPI_view.as_view(), name="api_food_list"),
    path('api/genfoodsearch/', views.GeneralFoodSearchAPI_view.as_view(), name="api_food_general"),
    path('api/foodsearch/', views.FoodSearchAPI_view.as_view(), name="api_food_search"),
    path('api/fooddetail/<int:pk>/', views.FoodDetailAPI_view.as_view(), name="api_food_detail"),
    
    path('api/stats/daily/', views.GetDailyIntakeAPI_view.as_view(), name="api_daily_stats"),
    path('api/stats/period/', views.GetPeriodIntakeAPI_view.as_view(), name="api_period_stats"),
    path('api/stats/average/', views.GetRunningAverageAPI_view.as_view(), name="api_average_stats"),

    path('api/add/quicktrack/', views.ParseFoodView.as_view(), name="quick-track"),


]