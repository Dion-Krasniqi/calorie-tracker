from django.db import models
from django.conf import settings

# Create your models here.

class Food(models.Model):
    
    name = models.CharField(max_length=200, unique=True, db_index=True)
    brand = models.CharField(max_length=100, blank=True, null=True)

    calories = models.DecimalField(max_digits=7, decimal_places=2) # 99999.99
    protein = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    carbohydrates = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    fats = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} : {self.calories}kcal"


class LoggedFood(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='logged_food'
    )

    food = models.ForeignKey(Food, on_delete=models.CASCADE)

    quantity = models.DecimalField(max_digits=7, decimal_places=2) # in grams
    date_consumed = models.DateField(auto_now_add=False, auto_now=False)
    calories_consumed = models.DecimalField(max_digits=9, decimal_places=2)
    # def calculate_calories(self):
    #   return (self.quantity/100.0*self.food.calories)
    
    def __str__(self):
        return f"{self.user.username} logged {self.quantity} of {self.food.name} on {self.date_consumed}"
