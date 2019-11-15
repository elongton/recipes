import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe, RecipeIngredientLink, RecipeStep, UnitType

# CREATE UNIT TYPES
Unit.objects.create(
    name="Teaspoon",
    unit_type=UnitType.objects.get(id=1),
    id=5,
    is_base_unit=True,
    multiplier=1.0,
)
