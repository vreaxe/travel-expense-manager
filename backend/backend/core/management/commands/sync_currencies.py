import os
import json

from django.core.management.base import BaseCommand

from backend.core.models import Currency


class Command(BaseCommand):
    help = 'Create or update currencies from JSON file'

    def handle(self, *args, **kwargs):
        data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../data'))
        data_filename = 'currencies.json'
        data_file = os.path.join(data_dir, data_filename)

        with open(data_file) as json_file:
            currencies = json.load(json_file)
            for currency in currencies:
                Currency.objects.update_or_create(
                    code=currency['code'],
                    defaults=currency
                )
