from django.contrib import admin
from .models import Recipe, Ingredient, RecipeIngredient, Tag, RecipeTag


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'units')


class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ('recipeId', 'ingredientId')


class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)


class RecipeTagAdmin(admin.ModelAdmin):
    list_display = ('recipeId', 'tagId',)


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(RecipeIngredient, RecipeIngredientAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(RecipeTag, RecipeTagAdmin)
