
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from caloriebalance import views as vw

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')),
    path('caloriebalance/', include('caloriebalance.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

]
