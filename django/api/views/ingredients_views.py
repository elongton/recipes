from api.models import (Ingredient, StoreSection, UnitType)
from api.serializers import (IngredientSerializer, IngredientCreateSerializer)
                            
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response


from .helpers.recipe_helpers import *
import json


class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientCreate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        ingredient_serializer = IngredientCreateSerializer(data = request.data)

        store_section = StoreSection.objects.get(id=request.data['store_section'])
        unit_type = UnitType.objects.get(id=request.data['unit_type'])
        if ingredient_serializer.is_valid():
            ingredient_obj = ingredient_serializer.save()
            responseData = {
                'name': ingredient_obj.name,
                'store_section': str(store_section),
                'unit_type': request.data['unit_type'],
                'unit_type_name': str(unit_type),
            }
            return Response(responseData, status=status.HTTP_201_CREATED)
        return Response(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# class IngredientList(APIView):
#     permission_classes = [permissions.AllowAny]
#     def get(self, request, format=None):
#         # serializer = 
#         ingredients = Ingredient.objects.all()
#         # print(ingredients)
#         return Response(ingredients)