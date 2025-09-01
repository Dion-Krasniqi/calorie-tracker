from django import forms
from django.core.exceptions import ValidationError
from .models import LoggedFood, Food

# Maybe for the later out of django
# def validate_positive_quantity(value):
#    if value<=0:
#        raise ValidationError("Quantity must be positive number", code="invalid_quantity")
class LoggedFoodForm(forms.ModelForm):
    class Meta:
        model = LoggedFood
        fields = ['food', 'quantity', 'date_consumed']
        widgets = {
            'date_consumed':forms.DateInput(attrs={'type':'date'}),
        }

    
    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity is not None and quantity<0:
            raise forms.ValidationError("Quantity must be a non negative number")
        return quantity