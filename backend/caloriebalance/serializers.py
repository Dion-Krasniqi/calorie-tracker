from rest_framework import serializers
from .models import LoggedFood, Food
from datetime import date


class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = ['id', 'name', 'calories', 'protein', 'carbohydrates', 'fats', 'time_tracked', 'last_tracked']
    


        
class LoggedFoodSerializer(serializers.ModelSerializer):
    date_consumed = serializers.DateField(default=date.today)
    food = FoodSerializer(read_only=True)
    food = serializers.PrimaryKeyRelatedField(queryset=Food.objects.all())
    class Meta:
        model = LoggedFood
        fields = ['id', 'food', 'quantity', 'date_consumed', 'calories_consumed']
        read_only_fields = ['calories_consumed']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        food_serializer = FoodSerializer(instance.food)
        representation['food'] = food_serializer.data
        return representation
    
    def validate_food(self, value):
        if self.instance and 'food' in self.initial_data:
            raise serializers.ValidationError("You cannot change food field")
        return value
