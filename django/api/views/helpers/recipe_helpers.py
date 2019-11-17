from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep, Unit, RecipeIngredientSection

def create_recipe_ingredient_section(section, recipeObj):
    recipe_ingredient_section = RecipeIngredientSection(
        name=section['name'],
        recipe=recipeObj,
    )
    recipe_ingredient_section.save()
    return recipe_ingredient_section

def create_ingredient_link(ingredient, recipeSectionObj):
    if (ingredient['is_recipe_as_ingredient']):
        recipeAsIngredientObj = Recipe.objects.get(id=ingredient['recipe_id'])
        unitObj = None
        ingredientObj = None
    else:
        unitObj = Unit.objects.get(id=ingredient['unit_id'])
        ingredientObj = Ingredient.objects.get(id=ingredient['ingredient_id'])
        recipeAsIngredientObj = None

    # print(recipeAsIngredientObj)
    recipeIngredientLink = RecipeIngredientLink(
        is_recipe_as_ingredient = ingredient['is_recipe_as_ingredient'],
        recipe_section=recipeSectionObj,
        ingredient=ingredientObj,
        recipe_as_ingredient = recipeAsIngredientObj,
        unit=unitObj,
        ingredient_quantity=ingredient['ingredient_quantity'],
        recipe_quantity=ingredient['recipe_quantity'],
        ingredient_notes = ingredient['ingredient_notes'],
        recipe_notes = ingredient['recipe_notes'],
        )
    recipeIngredientLink.save()

def create_step_link(recipeObj, step):
    recipeStep = RecipeStep(recipe=recipeObj, number=step['number'], instruction=step['instruction'])
    recipeStep.save()

def delete_recipe_ingredient_sections(recipeObj):
    for section in recipeObj.ingredient_sections.all():
        section.delete()

def delete_recipe_step_links(recipeObj):
    for stepLink in recipeObj.steps.all():
        stepLink.delete()

def checkIfExists(self, key, queryset, existing_id):
    verdict = False
    for x in queryset:
        if getattr(x, key) == existing_id:
            verdict = True
            break
    return verdict
