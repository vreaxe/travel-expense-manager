from django.contrib import admin

from backend.core.models import User, Currency, Country


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff', 'created_at',)
    list_filter = ('is_staff', 'is_active',)
    search_fields = ('email',)

admin.site.register(User, UserAdmin)


class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'symbol', 'symbol_native', 'exchange_rate', 'created_at', 'updated_at',)
    ordering = ('name',)
    search_fields = ('name', 'code',)

admin.site.register(Currency, CurrencyAdmin)


class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'alpha3', 'flag_emoji', 'get_currencies', 'created_at', 'updated_at',)
    list_filter = ('currencies',)
    ordering = ('name',)
    search_fields = ('name', 'code',)

    def get_currencies(self, obj):
        return ", ".join([p.name for p in obj.currencies.all()])

admin.site.register(Country, CountryAdmin)
