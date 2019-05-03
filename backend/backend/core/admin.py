from django.contrib import admin

from backend.core.models import User, Currency


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff', 'created_at',)
    list_filter = ('is_staff', 'is_active',)
    search_fields = ('email',)

admin.site.register(User, UserAdmin)


class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'symbol', 'symbol_native', 'exchange_rate', 'created_at', 'updated_at')
    ordering = ('created_at',)
    search_fields = ('name', 'code',)

admin.site.register(Currency, CurrencyAdmin)
