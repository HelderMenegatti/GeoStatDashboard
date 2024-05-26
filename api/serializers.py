from rest_framework import serializers
from api.models import State, County

class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = ['name']


class StateSerializer(serializers.ModelSerializer):
    county_count = serializers.SerializerMethodField()

    class Meta:
        model = State
        fields = ['id', 'name', 'region', 'uf', 'county_count']


    def get_county_count(self, obj):
        return obj.counties.count()