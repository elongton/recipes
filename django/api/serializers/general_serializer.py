from rest_framework import serializers
from api.models import (StoreSection, Tag)


class StoreSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreSection
        fields = ['name', 'id']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'id', 'tag_type']