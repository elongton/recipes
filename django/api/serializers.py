from rest_framework import serializers
from api.models import (Recipe, 
                        Ingredient, 
                        RecipeIngredientLink, 
                        RecipeStep, 
                        Unit, 
                        UnitType)

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ['id', 'name', 'unit_type', 'base_unit', 'multiplier']


class UnitTypeSerializer(serializers.ModelSerializer):
    # units = serializers.StringRelatedField(many=True)
    units = UnitSerializer(many=True)
    class Meta:
        model = UnitType
        fields = ['name', 'units', 'id']

class UnitTypeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitType
        fields = ['name', 'id']


class IngredientSerializer(serializers.ModelSerializer):
    unit_type_name = serializers.CharField(source='unit_type.name')
    store_section = serializers.CharField(source='store_section.name')
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit_type', 'unit_type_name', 'store_section']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='ingredient.name')
    id = serializers.IntegerField(source='ingredient.id')
    unit = serializers.CharField(source='unit.name')
    unit_id = serializers.IntegerField(source='unit.id')

    class Meta:
        model = RecipeIngredientLink
        fields = ['id', 'name', 'quantity', 'unit', 'unit_id', 'notes']


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['number', 'instruction']


class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(
        source='author.username', allow_null=True)
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    steps = RecipeStepSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description',
                  'image', 'steps', 'author', 'ingredients']
