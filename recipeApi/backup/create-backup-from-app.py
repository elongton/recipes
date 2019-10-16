import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
import recipeApi.settings as settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe


ingredients = Ingredient.objects.all()
units = Unit.objects.all()
recipes = Recipe.objects.all()




data = {}
data['units'] = []
data['ingredients'] = []
data['recipes']= []

for unit in units:
    data['units'].append({"name": unit.name, "unitType": unit.unitType})
for ingredient in ingredients:
    data['ingredients'].append({"name": ingredient.name, "unitType": ingredient.unitType})


for recipe in recipes:
    stepArray = []
    for step in recipe.steps.all():
        stepArray.append(
            {"number": step.number, "instruction": step.instruction}
        )
    ingredientArray = []
    for ingredient in recipe.ingredients.all():
        ingredientArray.append(
            {"name": ingredient.ingredient.name, "unitType": ingredient.unit.unitType, "quantity": ingredient.quantity, "unitName": ingredient.unit.name, "notes": ingredient.notes}
        )
    try:
        imageUrl = recipe.image.url.replace(settings.MEDIA_URL, '/')
    except:
        imageUrl = ''
    data['recipes'].append(
        {
            "title":recipe.title,
            "description":recipe.description,
            "image":  imageUrl,
            "steps": stepArray,
            "ingredients": ingredientArray
        }
    )

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)