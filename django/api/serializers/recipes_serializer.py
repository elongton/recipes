from rest_framework import serializers
from api.models import (Recipe, 
                        RecipeIngredientLink, 
                        RecipeStep,)


class RecipeIngredientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='ingredient.id')
    name = serializers.CharField(source='ingredient.name')
    unit = serializers.CharField(source='unit.name')
    unit_id = serializers.IntegerField(source='unit.id')
    unit_multiplier = serializers.CharField(source="unit.multiplier")


    class Meta:
        model = RecipeIngredientLink
        fields = [
        'id',
        'name',
        'quantity',
        'unit',
        'unit_id',
        'notes',
        'unit_multiplier']


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
                  'image', 'steps', 'author', 'ingredients', 'notes']
