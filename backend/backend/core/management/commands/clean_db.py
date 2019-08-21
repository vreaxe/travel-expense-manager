from django.core.management.base import BaseCommand

from backend.core.models import User
from backend.trip.models import Trip


class Command(BaseCommand):
    help = 'Clean database. BE CAREFUL!'

    def handle(self, *args, **kwargs):
        Trip.objects.all().delete()

        User.objects.all().delete()

        User.objects.create_superuser(email='admin@admin.com',password='12345678')
