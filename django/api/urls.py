from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipes/<int:pk>', RecipeDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
    path('ingredients/create/', IngredientCreate.as_view()),
    path('ingredients/<int:pk>', IngredientDetail.as_view()),
    path('units/', UnitList.as_view()),
    path('units/<int:pk>', UnitDetail.as_view()),
    path('unit-types/', UnitTypeList.as_view()),
    path('unit-types/create', UnitTypeCreate.as_view()),
    path('store-sections/', StoreSectionList.as_view()),
    path('tags/', TagList.as_view()),
]
