from django import forms
from .models import LoggedFood, Food

class LoggedFoodForm(forms.ModelForm):
    class Meta:
        model = LoggedFood
        fields = ['food', 'quantity', 'date_consumed']
        widgets = {
            'date_consumed':forms.DateInput(attrs={'type':'date'}),
        }
