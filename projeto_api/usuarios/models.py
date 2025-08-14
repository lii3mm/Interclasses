from django.db import models

# Create your models here.

class Modalidade(models.Model):
    nome = models.CharField(max_length=100)
    def __str__(self):
        return self.nome
    
class Usuario(models.Model):
    nome = models.TextField(max_length=100, null=False)
    turma = models.CharField(max_length=3, null=False)
    telefone = models.CharField(max_length=50, null=False)
    email = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.nome