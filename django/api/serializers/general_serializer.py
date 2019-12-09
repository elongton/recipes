from rest_framework import serializers
from api.models import (StoreSection, Tag, Reference, User, UserMeta)


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


class UserMetaSerializer(serializers.ModelSerializer):
    meta = serializers.JSONField(source='user_meta.meta')
    class Meta:
        model = User
        fields = ['meta']