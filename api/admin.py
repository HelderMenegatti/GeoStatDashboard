from django.contrib import admin

from api.models import State, County


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    pass


@admin.register(County)
class CountyAdmin(admin.ModelAdmin):
    pass