from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep, Unit, RecipeIngredientSection

def create_recipe_ingredient_section(section, recipeObj):
    recipe_ingredient_section = RecipeIngredientSection(
        name=section['name'],
        recipe=recipeObj,
    )
    recipe_ingredient_section.save()
    return recipe_ingredient_section

def create_ingredient_link(ingredient, recipeSectionObj):
    unitObj = Unit.objects.get(id=ingredient['unit_id'])
    ingredientObj = Ingredient.objects.get(
        id=ingredient['ingredient_id'])
    recipeIngredientLink = RecipeIngredientLink(
        recipe_section=recipeSectionObj,
        ingredient=ingredientObj,
        unit=unitObj,
        quantity=ingredient['quantity'],
        ingredient_notes = ingredient['ingredient_notes']
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
