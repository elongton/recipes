from rest_framework import serializers
from api.models import (StoreSection, Tag, Reference, User, UserData)


class StoreSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreSection
        fields = ['name', 'id']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'id', 'tag_type']

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ['key', 'value', 'reference_type', 'id']


class UserDataSerializer(serializers.ModelSerializer):
    meta = serializers.JSONField(source='user_data.meta')
    recipe_book = serializers.JSONField(source='user_data.recipe_book')
    shopping_list = serializers.JSONField(source='user_data.shopping_list')
    class Meta:
        model = User
        fields = ['meta', 'recipe_book', 'shopping_list']