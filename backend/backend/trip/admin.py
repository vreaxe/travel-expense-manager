from django.contrib import admin

from backend.trip.models import Trip, TripUser, Expense


class TripUserInline(admin.TabularInline):
    model = TripUser
    fields = ('user', 'role',)


class ExpenseInline(admin.TabularInline):
    model = Expense
    fields = ('title', 'amount', 'currency', 'created_by',)


class TripAdmin(admin.ModelAdmin):
    inlines = [
        TripUserInline,
        ExpenseInline,
    ]
    list_display = ('title', 'budget', 'start_date', 'end_date',)
    search_fields = ('title',)

admin.site.register(Trip, TripAdmin)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'currency', 'trip', 'created_by',)
    search_fields = ('title',)

admin.site.register(Expense, ExpenseAdmin)
