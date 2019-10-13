import json

import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')

import django
django.setup()

from api.models import Ingredient, Unit

with open('read-backup.json') as json_file:
    data = json.load(json_file)

### CREATE UNITS
    for unit in data['units']:
        #check if the unit exists
        if Unit.objects.filter(name=unit['name'], unitType=unit['unitType']):
            pass
        else:
            Unit.objects.create(
                name=unit['name'],
                unitType=unit['unitType']
            )
    print('units created')

#### CREATE INGREDIENTS
    for ingredient in data['ingredients']:
        if Ingredient.objects.filter(name=ingredient['name'], unitType=ingredient['unitType']):
            pass
        else:
            Ingredient.objects.create(
                name= ingredient['name'],
                unitType = ingredient['unitType']
            ) 
    print('ingredients created')
