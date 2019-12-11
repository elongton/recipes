from api.models import (Unit, 
                        UnitType,)
from api.serializers import (UnitSerializer,
                            UnitTypeSerializer,
                            UnitTypeCreateSerializer,)
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response


from ..helpers.recipe_helpers import *
import json



class UnitList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

class UnitDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


class UnitTypeList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = UnitType.objects.all()
    serializer_class = UnitTypeSerializer


class UnitTypeCreate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        #create unit type
        unit_type_data = {"name": request.data['name']}
        unit_type_serializer = UnitTypeCreateSerializer(data=unit_type_data)
        if unit_type_serializer.is_valid():
            unit_type_obj = unit_type_serializer.save()
        #create base unit
        unit_data = {'name': request.data['base_unit'], 'unit_type': unit_type_obj.id, 'is_base_unit': True, 'multiplier': 1}
        unit_serializer = UnitSerializer(data=unit_data)
        if unit_serializer.is_valid():
            unit_obj = unit_serializer.save()
            ut_final = unit_type_serializer.data
            u_final = unit_serializer.data
            responseData = {
                'name': ut_final['name'],
                'id': ut_final['id'],
                'units': [u_final]
            }

            #update base_unit property of new unit type
            unit_type_obj.base_unit=unit_obj
            unit_type_obj.save()
            return Response(responseData, status=status.HTTP_201_CREATED)
        return Response(unit_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
