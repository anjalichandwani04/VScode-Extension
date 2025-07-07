
from django.shortcuts import get_object_or_404,redirect
from .models import Todo





class IndexView:
    pass



def add(request):
    pass



def delete(request, todo_id):
    t = get_object_or_404(Todo,pk=todo_id)
    t.delete()
    return redirect('index')



def update(request,todo_id):
    pass
