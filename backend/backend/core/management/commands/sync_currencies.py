import os
import json

from django.core.management.base import BaseCommand

from backend.core.models import Currency


class Command(BaseCommand):
    help = 'Create or update currencies from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('-c', '--currencies', type=str, help='Specific currencies to import separated by a comma',)

    def handle(self, *args, **kwargs):
        data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../data'))
        data_filename = 'currencies.json'
        data_file = os.path.join(data_dir, data_filename)

        with open(data_file) as json_file:
            currencies = json.load(json_file)
            if kwargs['currencies']:
                specific_currencies = [currency.strip() for currency in kwargs['currencies'].split(',')]
                currencies = [currency for currency in currencies if currency['code'] in specific_currencies]
            for currency in currencies:
                Currency.objects.update_or_create(
                    code=currency['code'],
                    defaults=currency
                )
