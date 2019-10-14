import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe, RecipeIngredientLink, RecipeStep

def getUnit(name, type):
    return Unit.objects.get_or_create(name=name, unitType=type)
def getIngredient(name, type):
    return Ingredient.objects.get_or_create(name=name, unitType=type)


with open('data.json') as json_file:
    data = json.load(json_file)

# CREATE UNITS
    for unit in data['units']:
        # check if the unit exists
        if Unit.objects.filter(name=unit['name'], unitType=unit['unitType']):
            pass
        else:
            Unit.objects.create(
                name=unit['name'],
                unitType=unit['unitType']
            )
    print('units created')

# CREATE INGREDIENTS
    for ingredient in data['ingredients']:
        if Ingredient.objects.filter(name=ingredient['name'], unitType=ingredient['unitType']):
            pass
        else:
            Ingredient.objects.create(
                name=ingredient['name'],
                unitType=ingredient['unitType']
            )
    print('ingredients created')


# CREATE RECIPES
    for recipe in data['recipes']:
        ingredientArray = []
        #create the recipe
        createdRecipe = Recipe.objects.create(
            title=recipe['title'],
            description=recipe['description'],
            image=recipe['image'],
        )
        #create ingredient links
        for ingredient in recipe['ingredients']:
            unit = getUnit(ingredient['unitName'], ingredient['unitType'])
            listedIngredient = getIngredient(ingredient['name'], ingredient['unitType'])
            RecipeIngredientLink.objects.create(recipe=createdRecipe, ingredient=listedIngredient[0], quantity=ingredient['quantity'], unit=unit[0])
        #create step links
        for step in recipe['steps']:
            RecipeStep.objects.create(recipe=createdRecipe, number=step['number'], instruction=step['instruction'])
    print('created recipes')

