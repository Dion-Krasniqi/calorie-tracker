from rest_framework import serializers
from .models import LoggedFood, Food
from datetime import date

class LoggedFoodSerializer(serializers.ModelSerializer):
    date_consumed = serializers.DateField(default=date.today)

    class Meta:
        model = LoggedFood
        fields = ['id', 'food', 'quantity', 'date_consumed']
        read_only_fields = ['calories_consumed']

class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = ['id', 'name', 'brand', 'calories', 'protein', 'carbohydrates', 'fats']
    


        
