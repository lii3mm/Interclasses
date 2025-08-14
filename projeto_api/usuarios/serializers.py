from rest_framework import serializers 
from .models import Modalidade, Usuario

class ModalidadeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Modalidade
        fields = '__all__'
    
class UsuarioSerializer(serializers.ModelSerializer):
    modalidade = ModalidadeSerializer(read_only=True)
    modalidade_id = serializers.PrimaryKeyRelatedField(queryset=Modalidade.objects, source='modalidade', write_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'