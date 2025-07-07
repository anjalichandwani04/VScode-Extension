from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import Profile


class RegisterForm(UserCreationForm):
    # Add first_name, last_name, username, email, password1, password2 fields
    # Customize them with Bootstrap widgets using 'class': 'form-control'
    
    # 🔧 TODO: Define form fields here
    
    class Meta:
        model = User
        # 🔧 TODO: Add the appropriate list of fields


class LoginForm(AuthenticationForm):
    # Add username and password fields with custom widgets
    # Also include a 'remember_me' BooleanField (optional checkbox)

    # 🔧 TODO: Define the fields with appropriate widgets
    
    class Meta:
        model = User
        # 🔧 TODO: Add fields list


class UpdateUserForm(forms.ModelForm):
    # Fields: username, email
    # Add form-control classes
    
    # 🔧 TODO: Define fields with widgets
    
    class Meta:
        model = User
        # 🔧 TODO: Add fields list


class UpdateProfileForm(forms.ModelForm):
    # Fields: avatar (ImageField), bio (TextArea)
    # Use FileInput for avatar and Textarea for bio
    
    # 🔧 TODO: Define the fields and widgets
    
    class Meta:
        model = Profile
        # 🔧 TODO: Add fields list