from api.models import (Ingredient, StoreSection, UnitType, UnitTypeIngredientLink)
from api.serializers import (IngredientSerializer, IngredientCreateSerializer)
                            
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response


from ..helpers.recipe_helpers import *
import json


class IngredientList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        response_object = instance.id
        print(response_object)
        self.perform_destroy(instance)
        # return Response(response_object, status=status.HTTP_204_NO_CONTENT)
        return Response(response_object, status=status.HTTP_202_ACCEPTED) #this works...


class IngredientCreate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        ingredient_serializer = IngredientCreateSerializer(data = request.data)
        store_section = StoreSection.objects.get(id=request.data['store_section'])
        if ingredient_serializer.is_valid():
            ingredient_obj = ingredient_serializer.save()
            unit_types = []
            for type in request.data['unit_types']:
                unit_type = UnitType.objects.get(id=type)
                unitTypeIngredientLink = UnitTypeIngredientLink(ingredient=ingredient_obj, unit_type = unit_type,)
                unitTypeIngredientLink.save()
                # print(unit_type.units)
                temp = []
                for unit in unit_type.units.all():
                    temp.append({
                        'name': unit.name,
                        'id': unit.id,
                        })
                unit_types.append({"name": unit_type.name, "units":temp})

            responseData = {
                'id': ingredient_obj.id,
                'name': ingredient_obj.name,
                'store_section': str(store_section),
                'unit_types': unit_types,
            }
            return Response(responseData, status=status.HTTP_201_CREATED)
        return Response(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
