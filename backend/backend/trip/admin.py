from django.contrib import admin
from django.utils.html import format_html

from backend.trip.models import Trip, TripUser, TripCategory, Expense


class TripUserInline(admin.TabularInline):
    model = TripUser
    fields = ('user', 'role',)
    autocomplete_fields = ('user',)


class ExpenseInline(admin.TabularInline):
    model = Expense
    fields = ('title', 'amount', 'currency', 'created_by', 'date',)
    autocomplete_fields = ('currency', 'created_by',)


class TripCategoryInline(admin.TabularInline):
    model = TripCategory
    fields = ('name',)


class TripAdmin(admin.ModelAdmin):
    inlines = [
        TripUserInline,
        TripCategoryInline,
        ExpenseInline,
    ]
    list_display = ('title', 'budget', 'start_date', 'end_date',)
    search_fields = ('title',)
    autocomplete_fields = ('base_currency', 'countries',)

admin.site.register(Trip, TripAdmin)


class TripCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'show_color', 'trip')
    search_fields = ('name',)
    autocomplete_fields = ('trip',)

    def show_color(self, obj):
        if obj.color:
            return format_html('<span style="border-radius:50%; height:15px; width:15px; background:{0}; display:block;"></span>', obj.color)
    show_color.short_description = 'color'

admin.site.register(TripCategory, TripCategoryAdmin)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'currency', 'trip', 'category', 'created_by', 'date',)
    search_fields = ('title',)
    autocomplete_fields = ('currency', 'trip', 'created_by',)

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['category'].queryset = TripCategory.objects.filter(trip_id=obj.trip_id)
        return form

admin.site.register(Expense, ExpenseAdmin)
