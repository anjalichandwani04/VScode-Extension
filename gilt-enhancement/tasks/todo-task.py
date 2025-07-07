from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from .models import Todo
from django.http import HttpResponseRedirect

# ✅ Task 1: Implement a class-based view that lists all todos, most recent first
class IndexView(generic.ListView):
    template_name = 'todos/index.html'
    context_object_name = 'todo_list'

    def get_queryset(self):
        # TODO: Return all Todo objects ordered by '-created_at'
        pass


# ✅ Task 2: Add a new Todo from POST request
def add(request):
    # TODO: Get the 'title' from the request.POST dictionary
    # TODO: Create a new Todo object using the title
    # TODO: Redirect to the index page after adding
    pass


# ✅ Task 3: Delete a Todo item by ID
def delete(request, todo_id):
    # TODO: Get the Todo object using get_object_or_404 and todo_id
    # TODO: Delete the object
    # TODO: Redirect to the index page after deletion
    pass


# ✅ Task 4: Update the isCompleted status of a Todo
def update(request, todo_id):
    # TODO: Get the Todo object using get_object_or_404 and todo_id
    # TODO: Get the 'isCompleted' value from POST. Default should be False
    # TODO: If 'isCompleted' is 'on', set it to True
    # TODO: Update the todo object and save it
    # TODO: Redirect to the index page after saving
    pass