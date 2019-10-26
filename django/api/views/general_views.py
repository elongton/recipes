from api.models import (StoreSection,)
from api.serializers import (StoreSectionSerializer,)
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response


from .helpers.recipe_helpers import *
import json


class StoreSectionList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = StoreSection.objects.all()
    serializer_class = StoreSectionSerializer