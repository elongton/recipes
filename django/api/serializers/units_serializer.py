from rest_framework import serializers
from api.models import (Unit, 
                        UnitType,)

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ['id', 'name', 'unit_type', 'is_base_unit', 'multiplier']

class UnitTypeSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True)
    class Meta:
        model = UnitType
        fields = ['name', 'units', 'id']

class UnitTypeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitType
        fields = ['name', 'id']