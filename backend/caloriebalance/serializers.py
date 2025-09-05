from rest_framework import serializers
from .models import LoggedFood, Food
from datetime import date

class LoggedFoodSerializer(serializers.ModelSerializer):
    date_consumed = serializers.DateField(default=date.today)

    class Meta:
        model = LoggedFood
        fields = ['id', 'food', 'quantity', 'date_consumed', 'calories_consumed']
        read_only_fields = ['calories_consumed']
    
    def validate_food(self, value):
        if self.instance and 'food' in self.initial_data:
            raise serializers.ValidationError("You cannot change food field")
        return value

class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = ['id', 'name', 'brand', 'calories', 'protein', 'carbohydrates', 'fats']
    


        
