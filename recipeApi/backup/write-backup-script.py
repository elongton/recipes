import sys
sys.path.append("..") #make operations go up a level
import django
import json
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import Ingredient, Unit, Recipe, RecipeIngredientLink, RecipeStep


data = {}
data['people'] = []
data['people'].append({
    'name': 'Scott',
    'website': 'stackabuse.com',
    'from': 'Nebraska'
})
data['people'].append({
    'name': 'Larry',
    'website': 'google.com',
    'from': 'Michigan'
})
data['people'].append({
    'name': 'Tim',
    'website': 'apple.com',
    'from': 'Alabama'
})

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)