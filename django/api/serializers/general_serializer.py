from rest_framework import serializers
from api.models import (StoreSection)


class StoreSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreSection
        fields = ['name', 'id']