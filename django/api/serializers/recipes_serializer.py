from rest_framework import serializers
from api.models import (Recipe, 
                        RecipeIngredientLink, 
                        RecipeStep,
                        RecipeIngredientSection,)


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient_id = serializers.IntegerField(source='ingredient.id', allow_null=True)
    ingredient_name = serializers.CharField(source='ingredient.name', allow_null=True)
    ingredient_store_section = serializers.CharField(source='ingredient.store_section', allow_null=True)
    recipe_name = serializers.CharField(source='recipe_as_ingredient.title', allow_null=True)
    recipe_id = serializers.CharField(source='recipe_as_ingredient.id', allow_null=True)
    unit = serializers.CharField(source='unit.name', allow_null=True)
    unit_id = serializers.IntegerField(source='unit.id', allow_null=True)
    unit_multiplier = serializers.CharField(source="unit.multiplier", allow_null=True)


    class Meta:
        model = RecipeIngredientLink
        fields = [
        'ingredient_id',
        'ingredient_name',
        'recipe_name',
        'recipe_id',
        'ingredient_quantity',
        'recipe_quantity',
        'unit',
        'unit_id',
        'ingredient_notes',
        'recipe_notes',
        'unit_multiplier',
        'is_recipe_as_ingredient',
        'ingredient_store_section'
        ]


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['number', 'instruction']


class RecipeIngredientSectionSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    class Meta:
        model = RecipeIngredientSection
        fields = ['name', 'ingredients']

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(
        source='author.username', allow_null=True)
    # ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    steps = RecipeStepSerializer(many=True, read_only=True)
    ingredient_sections = RecipeIngredientSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description',
                  'image', 'steps', 'author', 'notes', 'ingredient_sections']
