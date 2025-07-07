
from django.shortcuts import render,  get_object_or_404 ,redirect
from .models import Todo
from django.views import generic



class IndexView(generic.ListView):
    template_name=   'todos/index.html'
    context_object_name='todo_list'


    def get_queryset(self):
        return Todo.objects.all().order_by('-created_at')






def add(request):
  if request.method=="POST":
      title=request.POST.get('title') 
      Todo.objects.create(title= title)
  return redirect('index')






def delete( request ,todo_id):
   todo = get_object_or_404(Todo,pk=todo_id)
   todo.delete()
   return redirect('index')





def update(request,todo_id):
  pass
