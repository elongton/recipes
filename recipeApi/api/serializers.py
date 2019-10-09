from rest_framework import serializers
from api.models import Recipe, Ingredient


class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(
        source='author.username', allow_null=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description',
                  'image', 'instructions', 'author']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'units', ]
