from django.contrib import admin
from .models import Recipe, Ingredient, RecipeIngredient


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'units')


class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ('recipeId', 'ingredientId')


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(RecipeIngredient, RecipeIngredientAdmin)
