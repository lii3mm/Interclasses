from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .models import Modalidade, Usuario
from .serializers import ModalidadeSerializer, UsuarioSerializer

class ModalidadeList(generics.ListCreateAPIView):
    queryset = Modalidade.objects.all()
    serializer_class = ModalidadeSerializer

class ModalidadeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Modalidade.objects.all()
    serializer_class = ModalidadeSerializer

class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer