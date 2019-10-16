from api.models import Recipe, Ingredient, RecipeIngredientLink, RecipeStep, Unit


def update_recipe_link(recipeObj, ingredient, newIngredient, newUnit, newQuantity):
    ingredientLink = recipeObj.ingredients.all().get(id=ingredient['id'])
    ingredientLink.ingredient = newIngredient
    ingredientLink.unit = newUnit
    ingredientLink.quantity = newQuantity
    ingredientLink.save()

def create_recipe_link(ingredient, recipeObj):
    unitObj = Unit.objects.get(id=ingredient['unitId'])
    ingredientObj = Ingredient.objects.get(
        id=ingredient['ingredientId'])
    recipeIngredientLink = RecipeIngredientLink(
        recipe=recipeObj,
        ingredient=ingredientObj,
        unit=unitObj,
        quantity=ingredient['quantity'],)
    recipeIngredientLink.save()

def create_step_link(recipeObj, step):
    recipeStep = RecipeStep(recipe=recipeObj, number=step['number'], instruction=step['instruction'])
    recipeStep.save()

def delete_recipe_ingredient_links(recipeObj):
    for ingredientLink in recipeObj.ingredients.all():
        ingredientLink.delete()

def delete_recipe_step_links(recipeObj):
    for stepLink in recipeObj.steps.all():
        stepLink.delete()



def checkIfExists(self, key, queryset, existing_id):
    # print(existing_id)
    verdict = False
    for x in queryset:
        if getattr(x, key) == existing_id:
            verdict = True
            break
    return verdict