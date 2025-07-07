
from django.shortcuts import render , get_object_or_404,redirect
from .models import Todo



class IndexView(generic.ListView):

    
    pass



def add(request):
    if request.method=='POST':
        title=request.POST['title']
    return redirect('index')


def delete(request,todo_id):
    todo=get_object_or_404(Todo,pk=todo_id)
    todo.delete()
    return redirect('index')



def update(request,todo_id):
    pass
