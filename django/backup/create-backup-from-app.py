import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
import recipeApi.settings as settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe, StoreSection, UnitType, UnitTypeIngredientLink

unit_types = UnitType.objects.all()
units = Unit.objects.all()
store_sections = StoreSection.objects.all()
ingredients = Ingredient.objects.all()
recipes = Recipe.objects.all()
unit_type_ingredient_links = UnitTypeIngredientLink.objects.all()


data = {}
data['unit_types'] = []
data['units'] = []
data['store_sections'] = []
data['ingredients'] = []
data['unit_type_ingredient_links'] = []
data['recipes']= []

for unit_type in unit_types:
    data['unit_types'].append({"name": unit_type.name, "base_unit": unit_type.base_unit.id, "id": unit_type.id})

for unit in units:
    data['units'].append({"name": unit.name, "unit_type": unit.unit_type.id, "is_base_unit": unit.is_base_unit, "multiplier": unit.multiplier, "id": unit.id})

for store_section in store_sections:
    data['store_sections'].append({"name": store_section.name, "id": store_section.id})

for ingredient in ingredients:
    data['ingredients'].append({"name": ingredient.name, "store_section": ingredient.store_section.id, "id": ingredient.id})

for unit_type_ingredient_link in unit_type_ingredient_links:
    data['unit_type_ingredient_links'].append({"ingredient": unit_type_ingredient_link.ingredient.id, "unit_type": unit_type_ingredient_link.unit_type.id, "id": unit_type_ingredient_link.id})



for recipe in recipes:
    step_array = []
    for step in recipe.steps.all():
        step_array.append(
            {"number": step.number, "instruction": step.instruction, "id": step.id}
        )
    data['recipes'].append(
        {
            "title":recipe.title,
            "description":recipe.description,
            "steps": step_array,
            "id": recipe.id
        }
    )

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)