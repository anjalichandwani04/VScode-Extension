
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import Profile

class RegisterForm(UserCreationForm):
    
    #  form for new user   regstration
    # -  must have proper  fields
    # e.g username,email  , pass
    
    
    
    class Meta:
        model=User




class LoginForm(AuthenticationForm):
    
    
    # loGin Form  
    username = forms.CharField( widget=forms.TextInput(attrs={'class': 'form-control'})  )
    password = forms.CharField(  widget=forms.PasswordInput(attrs={'class': 'form-control'})   )
    remember_me = forms.BooleanField(required=False)


    class Meta:
        model =User
        fields =['username',  'password']



class UpdateUserForm(forms.ModelForm):

    username = forms.CharField(widget=forms.TextInput(attrs={ 'class':'form-control'}))
    email = forms.EmailField( widget = forms.EmailInput( attrs={'class': 'form-control'})   )
    
    class Meta:
        model=User
        fields = ['username',  'email']


class UpdateProfileForm(forms.ModelForm):
    
    
  


    class Meta:
        model = Profile
