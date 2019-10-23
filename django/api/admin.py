from django.contrib import admin
from .models import (Recipe,
                    Ingredient, 
                    RecipeIngredientLink, 
                    Tag, 
                    RecipeTagLink, 
                    RecipeStep, 
                    Unit, 
                    UnitType,
                    StoreSection)


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title','author', 'id',  )


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'unit_type', 'id',  )


class RecipeIngredientLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe','ingredient', 'id', )


class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)


class RecipeTagLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'tag',)


class RecipeStepAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'number',)


class UnitsAdmin(admin.ModelAdmin):
    list_display = ('name', 'unit_type', 'base_unit', 'multiplier', 'id')

class UnitTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol')

class StoreSectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(RecipeIngredientLink, RecipeIngredientLinkAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(RecipeTagLink, RecipeTagLinkAdmin)
admin.site.register(RecipeStep, RecipeStepAdmin)
admin.site.register(Unit, UnitsAdmin)
admin.site.register(UnitType, UnitTypeAdmin)
admin.site.register(StoreSection, StoreSectionAdmin)
