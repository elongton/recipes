from rest_framework import serializers
from api.models import (Ingredient,)



class IngredientSerializer(serializers.ModelSerializer):
    unit_type_name = serializers.CharField(source='unit_type.name')
    store_section = serializers.CharField(source='store_section.name')
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit_type', 'unit_type_name', 'store_section']

class IngredientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'unit_type', 'store_section']