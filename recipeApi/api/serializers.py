from rest_framework import serializers
from api.models import Recipe, Ingredient, RecipeIngredientLink


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'units', ]

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    class Meta:
        model = RecipeIngredientLink
        fields = ['ingredient', 'quantity']

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(
        source='author.username', allow_null=True)
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description',
                  'image', 'instructions', 'author', 'ingredients']



