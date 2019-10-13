from django.contrib import admin
from .models import Recipe, Ingredient, RecipeIngredientLink, Tag, RecipeTagLink, RecipeStep


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author')


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'units')


class RecipeIngredientLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'ingredient')


class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)


class RecipeTagLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'tag',)


class RecipeStepAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'number',)


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(RecipeIngredientLink, RecipeIngredientLinkAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(RecipeTagLink, RecipeTagLinkAdmin)
admin.site.register(RecipeStep, RecipeStepAdmin)
