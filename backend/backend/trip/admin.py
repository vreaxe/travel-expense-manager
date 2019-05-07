from django.contrib import admin

from backend.trip.models import Trip, TripUser


class TripUserInline(admin.TabularInline):
    model = TripUser
    fields = ('user', 'role',)


class TripAdmin(admin.ModelAdmin):
    inlines = [
        TripUserInline,
    ]
    list_display = ('title', 'budget', 'start_date', 'end_date',)
    search_fields = ('title',)

admin.site.register(Trip, TripAdmin)
