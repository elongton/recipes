from rest_framework import serializers
from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'units', ]

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    class Meta:
        model = RecipeIngredientLink
        fields = ['ingredient', 'quantity']

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



