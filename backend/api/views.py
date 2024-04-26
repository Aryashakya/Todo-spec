from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import generics

class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        return Todo.objects.all()

    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class TodoDelete(generics.DestroyAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.all()
