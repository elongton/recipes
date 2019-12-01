from api.models import (StoreSection,Tag, Reference)
from api.serializers import (StoreSectionSerializer, TagSerializer, ReferenceSerializer)
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from drf_firebase_auth.authentication import FirebaseAuthentication


from ..helpers.recipe_helpers import *
import json


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


class ReferenceList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes=[SessionAuthentication]
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer