from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    # path('recipes/', RecipeList.as_view()),
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
    path('tags/', TagListCreateView.as_view()),
    path('tags/<int:pk>', TagEditDeleteView.as_view()),
    path('ref/', ReferenceList.as_view()),
    path('user/', UserDataRetrieveView.as_view()),
    path('user/meta', UserMetaUpdateView.as_view()),
    path('user/recipebook', UserRecipeBookUpdateView.as_view()),
    path('user/shoppinglist', UserShoppingListUpdateView.as_view()),
    path('user/mealplanner', UserMealPlannerUpdateView.as_view()),
]
