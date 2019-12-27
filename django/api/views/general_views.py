from api.models import (StoreSection,Tag, Reference, User, UserData)
from api.serializers import (StoreSectionSerializer, TagSerializer, ReferenceSerializer, UserDataSerializer)
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from drf_firebase_auth.authentication import FirebaseAuthentication
from django.core import serializers
import json


from ..helpers.recipe_helpers import *
from django.http import JsonResponse


class StoreSectionList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = StoreSection.objects.all()
    serializer_class = StoreSectionSerializer


class TagListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagEditDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        response_object = instance.id
        print(response_object)
        self.perform_destroy(instance)
        # return Response(response_object, status=status.HTTP_204_NO_CONTENT)
        return Response(response_object, status=status.HTTP_202_ACCEPTED) #this works...


class ReferenceList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer


# class UserMetaUpdateView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = [permissions.AllowAny]
#     authentication_classes=[SessionAuthentication]
#     queryset = User.objects.all()
#     serializer_class = UserMetaSerializer


class UserDataRetrieveView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        serializer = UserDataSerializer(user)
        responseData = serializer.data
        return Response(responseData, status=status.HTTP_201_CREATED)

class UserMetaUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    def put(self, request, format=None):
        userdata = UserData.objects.get(user=request.user.id)
        body = request.body
        userdata.meta = json.loads(str(request.body, encoding='utf-8'))
        userdata.save()
        responseData = 'worked'
        return Response(responseData, status=status.HTTP_202_ACCEPTED)

class UserRecipeBookUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    def put(self, request, format=None):
        userdata = UserData.objects.get(user=request.user.id)
        body = request.body
        userdata.recipe_book = json.loads(str(request.body, encoding='utf-8'))
        userdata.save()
        responseData = userdata.recipe_book
        return Response(responseData, status=status.HTTP_202_ACCEPTED)

class UserShoppingListUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    def put(self, request, format=None):
        userdata = UserData.objects.get(user=request.user.id)
        body = request.body
        userdata.shopping_list = json.loads(str(request.body, encoding='utf-8'))
        userdata.save()
        responseData = userdata.shopping_list
        return Response(responseData, status=status.HTTP_202_ACCEPTED)





# class IngredientCreate(APIView):
#     permission_classes = [permissions.AllowAny]
#     def post(self, request, format=None):
#         ingredient_serializer = IngredientCreateSerializer(data = request.data)
#         store_section = StoreSection.objects.get(id=request.data['store_section'])
#         if ingredient_serializer.is_valid():
#             ingredient_obj = ingredient_serializer.save()
#             unit_types = []
#             for type in request.data['unit_types']:
#                 unit_type = UnitType.objects.get(id=type)
#                 unitTypeIngredientLink = UnitTypeIngredientLink(ingredient=ingredient_obj, unit_type = unit_type,)
#                 unitTypeIngredientLink.save()
#                 # print(unit_type.units)
#                 temp = []
#                 for unit in unit_type.units.all():
#                     temp.append({
#                         'name': unit.name,
#                         'id': unit.id,
#                         })
#                 unit_types.append({"name": unit_type.name, "units":temp})

#             responseData = {
#                 'id': ingredient_obj.id,
#                 'name': ingredient_obj.name,
#                 'store_section': str(store_section),
#                 'unit_types': unit_types,
#             }
#             return Response(responseData, status=status.HTTP_201_CREATED)
#         return Response(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)