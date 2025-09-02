from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


from .models import CustomUser


CustomUser = get_user_model()

# Forms

class CustomRegistrationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'expenditure']
        
class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(label = 'username')


class ProfileForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ['expenditure']

        widgets = {
            'expenditure' : forms.NumberInput(attrs={'minlength':0,'maxlength':6,'required':False}),
        }



