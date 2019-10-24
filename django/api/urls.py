from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('recipes/', views.RecipeList.as_view()),
    path('recipes/<int:pk>', views.RecipeDetail.as_view()),
    path('ingredients/', views.IngredientList.as_view()),
    path('ingredients/create/', views.IngredientCreate.as_view()),
    path('ingredients/<int:pk>', views.IngredientDetail.as_view()),
    path('units/', views.UnitList.as_view()),
    path('units/<int:pk>', views.UnitDetail.as_view()),
    path('unit-types/', views.UnitTypeList.as_view()),
    path('unit-types/create', views.UnitTypeCreate.as_view()),
    path('store-sections/', views.StoreSectionList.as_view()),
]
