from django.db import models

# Create your models here.
UNIT_TYPES = (
    ('W', 'Wet'),
    ('D', 'Dry'),
    ('P', 'Poultry'),
    ('G', 'Garlic'),
    ('S', 'Singular'),
)

class Recipe(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    author = models.ForeignKey(
        'auth.User', related_name='recipes', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    unit_type = models.ForeignKey('UnitType', on_delete=models.SET_NULL, null=True, related_name='ingredients')
    store_section = models.ForeignKey('StoreSection', on_delete=models.SET_NULL, null=True, related_name='ingredients')
    def __str__(self):
        return self.name

class StoreSection(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=100, blank=True)
    unit_type = models.ForeignKey('UnitType', on_delete=models.SET_NULL, null=True, related_name='units')
    base_unit = models.BooleanField(default=False)
    multiplier = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return self.name


class UnitType(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=1)
    def __str__(self):
        return self.name


class RecipeStep(models.Model):
    recipe = models.ForeignKey(
        'Recipe', related_name='steps', on_delete=models.CASCADE)
    number = models.IntegerField()
    instruction = models.TextField()


class RecipeIngredientLink(models.Model):
    recipe = models.ForeignKey('Recipe',
                               related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient',
                                   related_name='ri_ingredient', on_delete=models.CASCADE)
    quantity = models.FloatField()
    notes = models.CharField(max_length=200, blank=True)
    unit = models.ForeignKey(
        'Unit', related_name="units", on_delete=models.CASCADE)

class Tag(models.Model):
    name = models.CharField(max_length=100)

class RecipeTagLink(models.Model):
    recipe = models.ForeignKey('Recipe',
                               related_name='rt_recipe', on_delete=models.CASCADE)
    tag = models.ForeignKey('Tag',
                            related_name='rt_tag', on_delete=models.CASCADE)
