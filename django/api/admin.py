from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (Recipe,
                    Ingredient, 
                    RecipeIngredientLink, 
                    RecipeIngredientSection,
                    Tag, 
                    RecipeTagLink, 
                    RecipeStep, 
                    Unit, 
                    UnitType,
                    UnitTypeIngredientLink,
                    StoreSection,
                    User,
                    UserMeta)




class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title','author', 'id',  )


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'id',  )


class RecipeIngredientLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe_section','ingredient', 'id', )

class RecipeIngredientSectionAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'name')

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'tag_type')


class RecipeTagLinkAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'tag',)


class RecipeStepAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'number',)


class UnitsAdmin(admin.ModelAdmin):
    list_display = ('name', 'unit_type', 'is_base_unit', 'multiplier', 'id')

class UnitTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_unit', 'id')

class StoreSectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')


class UnitTypeIngredientLinkAdmin(admin.ModelAdmin):
    list_display = ('unit_type', 'ingredient', 'id')

class UserMetaAdmin(admin.ModelAdmin):
    list_display = ('user', 'id')


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeIngredientSection, RecipeIngredientSectionAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(RecipeIngredientLink, RecipeIngredientLinkAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(RecipeTagLink, RecipeTagLinkAdmin)
admin.site.register(RecipeStep, RecipeStepAdmin)
admin.site.register(Unit, UnitsAdmin)
admin.site.register(UnitType, UnitTypeAdmin)
admin.site.register(StoreSection, StoreSectionAdmin)
admin.site.register(UnitTypeIngredientLink, UnitTypeIngredientLinkAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(UserMeta, UserMetaAdmin)