from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    author = models.ForeignKey(
        'auth.User', related_name='recipes', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

class RecipeStep(models.Model):
    recipe = models.ForeignKey(
        'Recipe', related_name='steps', on_delete=models.CASCADE)
    number = models.IntegerField()
    instruction = models.TextField()

class RecipeIngredientSection(models.Model):
    name = models.CharField(max_length=200)
    recipe = models.ForeignKey('Recipe', related_name='ingredient_sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class RecipeIngredientLink(models.Model):
    recipe_section = models.ForeignKey('RecipeIngredientSection', related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient',
                                   related_name='ri_ingredient', on_delete=models.CASCADE, null=True, blank=True)
    recipe_as_ingredient = models.ForeignKey('Recipe', related_name='recipe_as_ingredient', on_delete=models.CASCADE, null=True, blank=True)
    is_recipe_as_ingredient = models.BooleanField(default=False)
    quantity = models.FloatField()
    ingredient_notes = models.CharField(max_length=200, blank=True)
    recipe_notes = models.CharField(max_length=200, blank=True)
    unit = models.ForeignKey(
        'Unit', related_name="units", on_delete=models.CASCADE)

class RecipeTagLink(models.Model):
    recipe = models.ForeignKey('Recipe',
                               related_name='rt_recipe', on_delete=models.CASCADE)
    tag = models.ForeignKey('Tag',
                            related_name='rt_tag', on_delete=models.CASCADE)

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    store_section = models.ForeignKey('StoreSection', on_delete=models.SET_NULL, null=True, related_name='ingredients')
    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=100, blank=True)
    unit_type = models.ForeignKey('UnitType', on_delete=models.SET_NULL, null=True, related_name='units')
    is_base_unit = models.BooleanField(default=False)
    multiplier = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class UnitType(models.Model):
    name = models.CharField(max_length=100)
    base_unit = models.ForeignKey('Unit', on_delete=models.SET_NULL, null=True, related_name='base_unit', blank=True,)
    def __str__(self):
        return self.name

class UnitTypeIngredientLink(models.Model):
    unit_type = models.ForeignKey('UnitType', on_delete=models.CASCADE, related_name='uti_unit_type')
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE, related_name='unit_types')
    # def __str__(self):
    #     return self.unit_type.name + '_' + self.ingredient.name

class Tag(models.Model):
    name = models.CharField(max_length=100)

class StoreSection(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name