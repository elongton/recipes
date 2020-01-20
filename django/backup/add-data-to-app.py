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
                        UnitTypeIngredientLink,
                        RecipeIngredientSection,
                        Tag,
                        Reference,
                        RecipeTagLink)

def reset_nextvals(seq_id_name, table_name):
    with connection.cursor() as cursor:
        cursor.execute("DROP SEQUENCE IF EXISTS "+seq_id_name+" CASCADE;")
        cursor.execute("CREATE SEQUENCE "+seq_id_name+";")
        cursor.execute("SELECT setval('"+seq_id_name+"', max(id)) FROM "+table_name+";")
        cursor.execute("ALTER TABLE "+table_name+" ALTER COLUMN id SET DEFAULT nextval('"+seq_id_name+"')");

with open('data.json') as json_file:
    data = json.load(json_file)



###### CREATE REFDATA
    for ref in data['ref_data']:
        try:
            Reference.objects.create(
                key=ref['key'],
                value=ref['value'],
                reference_type=ref['reference_type'],
                id=ref['id'],
            )
        except:
            print('created already')
            pass
    print('reference created')
    try:
        reset_nextvals("ref_seq", "api_reference")
        print('ref db nextval updated')
    except ValueError:
        print(ValueError)
        pass

###### CREATE TAGS
    for tag in data['tags']:
        try:
            Tag.objects.create(
                name=tag['name'],
                tag_type=tag['tag_type'],
                id=tag['id']
            )
        except:
            print('created already')
            pass
    print('tags created')
    try:
        reset_nextvals("tags_seq", "api_tag")
        print('tag db nextval updated')
    except ValueError:
        print(ValueError)
        pass


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
        if recipe['image']:
            split_url = recipe['image'].split("mediafiles/", 1)[1]
        try:
            new_recipe = Recipe.objects.create(
                id=recipe['id'],
                title=recipe['title'],
                description=recipe['description'],
                notes=recipe['notes'],
            )
            if recipe['image']:
                new_recipe.image = split_url
                new_recipe.save()
        except:
            print('created already')
            pass
    try:
        reset_nextvals("recipe_seq", "api_recipe")
        print('recipe db nextval updated')
    except ValueError:
        print(ValueError)
        pass

###### CREATE RECIPE STEPS
    for recipe_step in data['recipe_steps']:
        try:
            RecipeStep.objects.create(
                id=recipe_step['id'],
                number=recipe_step['number'],
                instruction=recipe_step['instruction'],
                recipe=Recipe.objects.get(id=recipe_step['recipe'])
            )
        except:
            print('created already')
            pass
    try:
        reset_nextvals("recipe_step_seq", "api_recipestep")
        print('recipe step db nextval updated')
    except ValueError:
        print(ValueError)
        pass

###### CREATE RECIPE INGREDIENT SECTIONS
    for recipe_ingredient_section in data['recipe_ingredient_sections']:
        try:
            RecipeIngredientSection.objects.create(
                id=recipe_ingredient_section['id'],
                recipe=Recipe.objects.get(id=recipe_ingredient_section['recipe']),
                name=recipe_ingredient_section['name'],
            )
        except:
            print('created already')
            pass
    try:
        reset_nextvals("recipe_ingredient_section_seq", "api_recipeingredientsection")
        print('recipe ingredient section db nextval updated')
    except ValueError:
        print(ValueError)
        pass


###### CREATE RECIPE INGREDIENT LINKS
    for recipe_ingredient_link in data['recipe_ingredient_links']:
        if recipe_ingredient_link['recipe_section']:
            recipe_section = RecipeIngredientSection.objects.get(id=recipe_ingredient_link['recipe_section'])
        else: 
            recipe_section = None

        if recipe_ingredient_link['ingredient']:
            ingredient = Ingredient.objects.get(id=recipe_ingredient_link['ingredient'])
        else:
            ingredient = None

        if recipe_ingredient_link['unit']:
            unit = Unit.objects.get(id=recipe_ingredient_link['unit'])
        else:
            unit = None

        if recipe_ingredient_link['recipe_as_ingredient']:
            recipe = Recipe.objects.get(id=recipe_ingredient_link['recipe_as_ingredient'])
        else:
            recipe = None

        try:
            RecipeIngredientLink.objects.create(
                id=recipe_ingredient_link['id'],
                recipe_section = recipe_section,
                ingredient = ingredient,
                unit = unit,
                recipe_as_ingredient = recipe,
                is_recipe_as_ingredient = recipe_ingredient_link['is_recipe_as_ingredient'],
                ingredient_quantity = recipe_ingredient_link['ingredient_quantity'],
                recipe_quantity = recipe_ingredient_link['recipe_quantity'],
                ingredient_notes = recipe_ingredient_link['ingredient_notes'],
                recipe_notes = recipe_ingredient_link['recipe_notes'],
            )
        except:
            print('created already')
            pass
    try:
        reset_nextvals("recipe_ingredient_link_seq", "api_recipeingredientlink")
        print('recipe ingredient link db nextval updated')
    except ValueError:
        print(ValueError)
        pass


###### CREATE RECIPE TAG LINKS
    for recipe_tag_link in data['recipe_tag_links']:
        try:
            RecipeTagLink.objects.create(
                recipe=Recipe.objects.get(id=recipe_tag_link['recipe']),
                tag=Tag.objects.get(id=recipe_tag_link['tag']),
                id=recipe_tag_link['id'],
            )
        except:
            print('created already')
            pass
    print('recipe tag links created')
    try:
        reset_nextvals("recipe_tag_link_seq", "api_recipetaglink")
        print('recipe tag links db nextval updated')
    except ValueError:
        print(ValueError)
        pass