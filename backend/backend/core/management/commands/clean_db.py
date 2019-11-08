import logging

from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection

from backend.core.models import User
from backend.trip.models import Trip


class Command(BaseCommand):
    help = 'Clean database. BE CAREFUL!'

    def handle(self, *args, **kwargs):
        self.stdout.write('➡️  Reset database...')
        call_command('reset_db', interactive=False)
        with connection.cursor() as cursor:
            cursor.execute("ALTER DATABASE travel_expense_manager CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;")
        self.stdout.write('➡️  Migrations...')
        call_command('migrate', interactive=False)
        self.stdout.write('➡️  Sync currencies and countries...')
        call_command('sync_currencies', currencies="EUR,USD")
        call_command('sync_countries', countries="ES,DE,US")
        self.stdout.write('➡️  Create superuser...')
        User.objects.create_superuser(email='admin@admin.com',password='12345678')
