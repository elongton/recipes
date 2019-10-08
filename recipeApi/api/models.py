from django.db import models

# Create your models here.


class Recipe(models.Model):
    title = models.CharField(max_length=100, default='new recipe')
    description = models.TextField()
    image = models.ImageField(blank=True, null=True)
    instructions = models.TextField()
    author = models.ForeignKey(
        'auth.User', related_name='recipes', on_delete=models.SET_NULL, null=True)


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    units = models.CharField(max_length=100)


class Units(models.Model):
    name = models.CharField(max_length=100)


class RecipeIngredient(models.Model):
    recipeId = models.ForeignKey('Recipe',
                                 related_name='recipe', on_delete=models.CASCADE)
    ingredientId = models.ForeignKey('Ingredient',
                                     related_name='ingredient', on_delete=models.CASCADE)
