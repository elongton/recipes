import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
import recipeApi.settings as settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe, StoreSection


ingredients = Ingredient.objects.all()
units = Unit.objects.all()
recipes = Recipe.objects.all()
store_sections = StoreSection.objects.all()




data = {}
data['unit_types'] = []
data['store_sections'] = []
data['units'] = []
data['ingredients'] = []
data['recipes']= []


for store_section in store_sections:
    data['store_sections'].append({"name": store_section.name, "id": store_section.id})

for unit in units:
    data['units'].append({"name": unit.name, "unitType": unit.unit_type.id, "isBaseUnit": unit.is_base_unit, "multiplier": unit.multiplier, "id": unit.id})

for ingredient in ingredients:
    data['ingredients'].append({"name": ingredient.name, "unitType": ingredient.unit_type.id, "storeSection": ingredient.store_section.id, "id": ingredient.id})


for recipe in recipes:
    stepArray = []
    for step in recipe.steps.all():
        stepArray.append(
            {"number": step.number, "instruction": step.instruction, "id": step.id}
        )
    ingredientArray = []
    for ingredient in recipe.ingredients.all():
        ingredientArray.append(
            {"name": ingredient.ingredient.name, "unitType": ingredient.unit.unit_type.id, "quantity": ingredient.quantity, "unitName": ingredient.unit.name, "notes": ingredient.notes, "id": ingredient.id}
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
            "ingredients": ingredientArray,
            "id": recipe.id
        }
    )

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)