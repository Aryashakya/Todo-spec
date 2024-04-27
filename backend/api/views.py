from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import generics


class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        completed = self.request.query_params.get("completed", None)
        if completed is not None:
            completed = completed.lower() in ["true/", "1/", "t/"]
            queryset = queryset.filter(completed=completed)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class TodoUpdate(generics.UpdateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    lookup_field = "pk"


class TodoDelete(generics.DestroyAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.all()
