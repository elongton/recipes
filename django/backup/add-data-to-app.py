import sys
sys.path.append("..") #make operations go up a level
import django
from django.db import connection
import json
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipeApi.settings')
django.setup()
from api.models import (Ingredient,
                        Unit,
                        Recipe,
                        RecipeIngredientLink,
                        RecipeStep,
                        UnitType,
                        StoreSection,
                        UnitTypeIngredientLink)

def reset_nextvals(seq_id_name, table_name):
    with connection.cursor() as cursor:
        cursor.execute("DROP SEQUENCE IF EXISTS "+seq_id_name+";")
        cursor.execute("CREATE SEQUENCE "+seq_id_name+";")
        cursor.execute("SELECT setval('"+seq_id_name+"', max(id)) FROM "+table_name+";")
        cursor.execute("ALTER TABLE "+table_name+" ALTER COLUMN id SET DEFAULT nextval('"+seq_id_name+"')");

with open('data.json') as json_file:
    data = json.load(json_file)


###### CREATE UNIT TYPES and UNITS
    for unit_type in data['unit_types']:
        try:
            UnitType.objects.create(
                    name=unit_type['name'],
                    id=unit_type['id']
                )
        except:
            print('created already')
            pass
    print('unit types created')
    try:
        reset_nextvals("unit_types_seq", "api_unittype")
        print('unit types db nextval updated')
    except ValueError:
        print(ValueError)
        pass

    for unit in data['units']:
        try:
            Unit.objects.create(
                name=unit['name'],
                unit_type=UnitType.objects.get(id=unit['unit_type']),
                id=unit['id'],
                is_base_unit=unit['is_base_unit'],
                multiplier=unit['multiplier'],
            )
        except:
            print('created already')
            pass
    print('units created')
    try:
        reset_nextvals("units_seq", "api_unit")
        print('unit db nextval updated')
    except ValueError:
        print(ValueError)
        pass

    #now update base unit on unit_types
    for unit_type in data['unit_types']:
        ut = UnitType.objects.get(id=unit_type['id'])
        ut.base_unit=Unit.objects.get(id=unit_type['base_unit'])
        ut.save()
    print('unit types updated')

###### CREATE STORE SECTIONS

    for store_section in data['store_sections']:
        try:
            StoreSection.objects.create(
                name=store_section['name'],
                id=store_section['id']
            )
        except:
            print('created already')
            pass
    print('store sections created')
    try:
        reset_nextvals("stores_seq", "api_storesection")
        print('store db nextval updated')
    except ValueError:
        print(ValueError)
        pass

###### CREATE INGREDIENTS
    for ingredient in data['ingredients']:
        try:
            Ingredient.objects.create(
                name=ingredient['name'],
                store_section=StoreSection.objects.get(id=ingredient['store_section']),
                id=ingredient['id'],
            )
        except:
            print('created already')
            pass
    print('ingredients created')
    try:
        reset_nextvals("ingredient_seq", "api_ingredient")
        print('ingredient db nextval updated')
    except ValueError:
        print(ValueError)
        pass



###### CREATE UNIT_TYPE INGREDIENT LINKS
    for unit_type_ingredient_link in data['unit_type_ingredient_links']:
        try:
            UnitTypeIngredientLink.objects.create(
                unit_type=UnitType.objects.get(id=unit_type_ingredient_link['unit_type']),
                ingredient=Ingredient.objects.get(id=unit_type_ingredient_link['ingredient']),
                id=unit_type_ingredient_link['id']
            )
        except:
            print('created already')
            pass
    print('unit type ingredient links created')
    try:
        reset_nextvals("unit_ingredient_seq", "api_unittypeingredientlink")
        print('unit_type ingredient link db nextval updated')
    except ValueError:
        print(ValueError)
        pass

###### CREATE RECIPES
    for recipe in data['recipes']:
        try:
            Recipe.objects.create(
                id=recipe['id'],
                title=recipe['title'],
                description=recipe['description'],
                notes=recipe['notes'],
            )
        except:
            print('created already')
            pass
    try:
        reset_nextvals("recipe_seq", "api_recipe")
        print('recipe db nextval updated')
    except ValueError:
        print(ValueError)
        pass