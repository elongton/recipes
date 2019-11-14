from api.models import (Recipe, 
                        RecipeIngredientLink, 
                        RecipeStep, )
from api.serializers import (RecipeSerializer,)

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
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
        ingredient_sections = data['ingredient_sections']
        steps = data['steps']
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            notes = data['notes'],
            image=image
        )
        # ingredient sections
        try:
            for ingredient_section in ingredient_sections:
                recipeSectionObj = create_recipe_ingredient_section(ingredient_section, recipeObj)
                for ingredient in ingredient_section['ingredients']:
                    create_ingredient_link(ingredient, recipeSectionObj)
        except ValueError:
            print('no ingredients')
        # get list of steps from request, and add them to link table
        try:
            for step in steps:
                create_step_link(recipeObj, step)
        except ValueError:
            print('no steps')


# Retrieve, Update, and Destroy
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def perform_update(self, serializer):
        data = json.loads(self.request.data['fields'])
        ingredient_sections = data['ingredient_sections']
        steps = data['steps']

        pk = self.request.parser_context['kwargs']['pk']
        existingImage = Recipe.objects.get(id=pk).image
        image = self.request.data['image']
        
        # update top level fields
        recipeObj = serializer.save(
            author=None,
            title=data['title'],
            description=data['description'],
            notes=data['notes'],
        )
        # handle image upload
        if not image:
            recipeObj = serializer.save(image = existingImage)
        else:
            recipeObj = serializer.save(image = image)
        # delete and then create new set of ingredients
        delete_recipe_ingredient_sections(recipeObj)
        for ingredient_section in ingredient_sections:
            recipeSectionObj = create_recipe_ingredient_section(ingredient_section, recipeObj)
            for ingredient in ingredient_section['ingredients']:
                create_ingredient_link(ingredient, recipeSectionObj)
        # delete and then create new set of steps
        delete_recipe_step_links(recipeObj)
        for step in steps:
            create_step_link(recipeObj, step)