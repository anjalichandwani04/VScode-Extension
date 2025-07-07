
from django.shortcuts import render,redirect,get_object_or_404
from django.views import generic
from .models import Todo


class IndexView(generic.ListView):
    template_name = 'todos/index.html'
    context_object_name = 'todo_list'
    def get_queryset(self):
        return Todo.objects.order_by('-created_at')



def add(request):
 if request.method == 'POST':
     title = request.POST.get('title')
     if title: Todo.objects.create(title = title)
 return redirect('index')


def delete(request,todo_id):
    todo=get_object_or_404(Todo,pk=todo_id)
    todo.delete()
    return redirect('index')



def update(request,todo_id):
    todo= get_object_or_404(Todo,pk=todo_id)
    isComp = request.POST.get('isCompleted','')=='on'
    todo.isCompleted = isComp
    todo.save()
    return redirect('index')
