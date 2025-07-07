
from django.shortcuts import render,redirect,get_object_or_404
from .models import Todo



class IndexView:
    pass



def add(request):
   if request.method == 'POST':
       title= request.POST.get('title')
       if title: Todo.objects.create(title=title)
   return redirect('index')





def delete(request,todo_id):
    pass



def update(request,todo_id):
   todo = get_object_or_404(Todo, pk=todo_id)
   isComp = request.POST.get('isCompleted','') == 'on'
   todo.isCompleted=isComp
   todo.save()
   return redirect('index')
