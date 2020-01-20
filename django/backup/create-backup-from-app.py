import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
import recipeApi.settings as settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import (Ingredient, 
                        Unit, 
                        StoreSection, 
                        UnitType, 
                        UnitTypeIngredientLink, 
                        RecipeStep,
                        RecipeIngredientLink,
                        RecipeIngredientSection,
                        Recipe, 
                        Reference,
                        Tag,
                        RecipeTagLink
                        )

unit_types = UnitType.objects.all()
units = Unit.objects.all()
store_sections = StoreSection.objects.all()
ingredients = Ingredient.objects.all()
unit_type_ingredient_links = UnitTypeIngredientLink.objects.all()
recipe_ingredient_sections = RecipeIngredientSection.objects.all()
recipe_ingredient_links = RecipeIngredientLink.objects.all()
recipes = Recipe.objects.all()
recipe_steps = RecipeStep.objects.all()
ref_data = Reference.objects.all()
recipe_tag_links = RecipeTagLink.objects.all()
tags = Tag.objects.all()


data = {}
data['unit_types'] = []
data['units'] = []
data['store_sections'] = []
data['ingredients'] = []
data['unit_type_ingredient_links'] = []
data['recipe_steps'] = []
data['recipe_ingredient_links'] = []
data['recipe_ingredient_sections'] = []
data['recipes']= []

data['ref_data'] = []
data['tags'] = []
data['recipe_tag_links'] = []


for ref in ref_data:
    data['ref_data'].append({"key": ref.key, "value": ref.value, "reference_type": ref.reference_type, "id": ref.id})

for tag in tags:
    data['tags'].append({"name": tag.name, "tag_type": tag.tag_type, "id": tag.id})

for recipe_tag_link in recipe_tag_links:
    data['recipe_tag_links'].append({"recipe": recipe_tag_link.recipe.id, "tag": recipe_tag_link.tag.id, "id": recipe_tag_link.id})

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

for recipe_ingredient_section in recipe_ingredient_sections:
    data['recipe_ingredient_sections'].append({"name": recipe_ingredient_section.name,
                                               "id": recipe_ingredient_section.id, 
                                               "recipe": recipe_ingredient_section.recipe.id})

for recipe_ingredient_link in recipe_ingredient_links:
    if recipe_ingredient_link.ingredient:
        ingredient_id = recipe_ingredient_link.ingredient.id
    else:
        ingredient_id = None
    if recipe_ingredient_link.recipe_as_ingredient:
        recipe_id = recipe_ingredient_link.recipe_as_ingredient.id
    else:
        recipe_id = None
    if recipe_ingredient_link.unit:
        unit_id = recipe_ingredient_link.unit.id
    else:
        unit_id = None
    data['recipe_ingredient_links'].append({"id": recipe_ingredient_link.id,
                                            "recipe_section": recipe_ingredient_link.recipe_section.id, 
                                            "ingredient": ingredient_id,
                                            "recipe_as_ingredient": recipe_id,
                                            "is_recipe_as_ingredient": recipe_ingredient_link.is_recipe_as_ingredient,
                                            "ingredient_quantity": recipe_ingredient_link.ingredient_quantity,
                                            "recipe_quantity": recipe_ingredient_link.recipe_quantity,
                                            "ingredient_notes": recipe_ingredient_link.ingredient_notes,
                                            "recipe_notes": recipe_ingredient_link.recipe_notes,
                                            "unit": unit_id})

for step in recipe_steps:
    data['recipe_steps'].append({"id": step.id,
                                 "recipe": step.recipe.id,
                                 "number": step.number,
                                 "instruction": step.instruction})

for recipe in recipes:
    try:
        image_url = recipe.image.url
    except:
        image_url = None
    data['recipes'].append({"id": recipe.id,
                            "title": recipe.title,
                            "description": recipe.description,
                            "notes": recipe.notes,
                            "image": image_url})

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)