from rest_framework import serializers
from .models import LoggedFood
from datetime import date

class LoggedFoodSerializer(serializers.ModelSerializer):
    date_consumed = serializers.DateField(default=date.today)

    class Meta:
        model = LoggedFood
        fields = ['id', 'user', 'food', 'quantity', 'date_consumed']
        read_only_fields = ['calories_consumed']


        
