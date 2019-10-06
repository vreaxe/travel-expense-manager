from django.contrib import admin

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
    list_display = ('name', 'trip')
    search_fields = ('name',)
    autocomplete_fields = ('trip',)

admin.site.register(TripCategory, TripCategoryAdmin)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'currency', 'trip', 'category', 'created_by', 'date',)
    search_fields = ('title',)
    autocomplete_fields = ('currency', 'trip', 'category', 'created_by',)

admin.site.register(Expense, ExpenseAdmin)
