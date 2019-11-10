from rest_framework import serializers
from api.serializers.units_serializer import UnitTypeSerializer
from api.models import (Ingredient, UnitTypeIngredientLink)



class UnitTypeIngredientSerializer(serializers.ModelSerializer):
    # unit_type = UnitTypeSerializer(read_only=True)
    unit_type = serializers.CharField(source='unit_type.name')

    class Meta:
        model = UnitTypeIngredientLink
        fields = ['unit_type']


class IngredientSerializer(serializers.ModelSerializer):
    store_section = serializers.CharField(source='store_section.name')
    unit_types = UnitTypeIngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'store_section', 'unit_types']


class IngredientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'unit_type', 'store_section']