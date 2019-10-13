from django.db import models

# Create your models here.


class Recipe(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    author = models.ForeignKey(
        'auth.User', related_name='recipes', on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.title

class RecipeStep(models.Model):
    recipe = models.ForeignKey('Recipe', related_name='steps', on_delete=models.CASCADE)
    number = models.IntegerField()
    instruction = models.TextField()


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    units = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Units(models.Model):
    name = models.CharField(max_length=100)

class RecipeIngredientLink(models.Model):
    recipe = models.ForeignKey('Recipe',
                               related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient',
                                   related_name='ri_ingredient', on_delete=models.CASCADE)
    quantity = models.FloatField()


class Tag(models.Model):
    name = models.CharField(max_length=100)


class RecipeTagLink(models.Model):
    recipe = models.ForeignKey('Recipe',
                               related_name='rt_recipe', on_delete=models.CASCADE)
    tag = models.ForeignKey('Tag',
                            related_name='rt_tag', on_delete=models.CASCADE)
