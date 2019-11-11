from rest_framework import serializers
from api.serializers.units_serializer import UnitTypeSerializer
from api.models import (Ingredient, UnitTypeIngredientLink)




class IngredientSerializer(serializers.ModelSerializer):
    store_section = serializers.CharField(source='store_section.name')
    unit_types = serializers.SerializerMethodField()
    class Meta:
        model = Ingredient
        fields = ['id','name', 'store_section', 'unit_types']

    def get_unit_types(self, obj):
        data = []
        for type in obj.unit_types.all():
            temp = {'name': type.unit_type.name, 'units': []}
            for unit in type.unit_type.units.all():
                temp['units'].append({
                    'name': unit.name,
                    'multiplier': unit.multiplier
                    })
            data.append(temp)
        return data



class IngredientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'store_section']


## example....
# def create(self, validated_data):
#     # DRF will create object {"user": {"email": "inputed_value"}} in validated_date
#     email = validated_data.get("user", {}).get('email')