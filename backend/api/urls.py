from django.urls import path
from . import views

urlpatterns = [
    path("todos/", views.TodoListCreate.as_view(), name="todo-list"),
    path("todos/delete/<int:pk>/", views.TodoDelete.as_view(), name="delete-todo"),
]
