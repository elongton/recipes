from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep, Unit
from api.serializers import RecipeSerializer, IngredientSerializer, UnitSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response

from .helpers.recipe_helpers import *
import json


#Create and List
class RecipeList(generics.ListCreateAPIView):
    #overrides and settings
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        try:
            image = self.request.data['image']
        except:
            image = None
        data = json.loads(self.request.data['fields'])
        ingredients = data['ingredients']
        steps = data['steps']
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            image=image
        )
        # get list of ingredients from request, and add them to link table
        try:
            for ingredient in ingredients:
                create_recipe_link(ingredient, recipeObj)
        except ValueError:
            print('no ingredients')

        # get list of steps from request, and add them to link table
        try:
            for step in steps:
                recipeStep = RecipeStep(
                    recipe=recipeObj, number=step['number'], instruction=step['instruction'])
                recipeStep.save()
        except ValueError:
            print('no steps')


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def perform_update(self, serializer):
        data = json.loads(self.request.data['fields'])
        ingredients = data['ingredients']
        steps = data['steps']
        pk = self.request.parser_context['kwargs']['pk']
        existingImage = Recipe.objects.get(id=pk).image
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
        )
        image = self.request.data['image']
        if not image:
            recipeObj = serializer.save(image = existingImage)
        else:
            recipeObj = serializer.save(image = image)
        delete_recipe_ingredient_links(recipeObj)
        for ingredient in ingredients:
                print('new, create')
                create_recipe_link(ingredient, recipeObj)

class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer



class UnitList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer




# if self.request.user.is_authenticated:
#     recipeObj = serializer.save(author=self.request.user)
# else:
#     recipeObj = serializer.save(author=None)