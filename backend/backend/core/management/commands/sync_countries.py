import os
import json
import logging

from django.core.management.base import BaseCommand

from backend.core.models import Currency, Country


class Command(BaseCommand):
    help = 'Create or update countries from JSON file'
    log = logging.getLogger(__name__)

    def handle(self, *args, **kwargs):
        data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../data'))
        data_filename = 'countries.json'
        data_file = os.path.join(data_dir, data_filename)

        with open(data_file) as json_file:
            countries = json.load(json_file)
            for country in countries:
                country_n, _ = Country.objects.update_or_create(
                    code=country['code'],
                    defaults={
                        'name': country['name'],
                        'code': country['code'],
                        'alpha3': country['alpha3'],
                        'latitude': country['latlng'][0],
                        'longitude': country['latlng'][1],
                        'flag_emoji': country['flag_emoji'],
                    }
                )
                for currency in country['currencies']:
                    if not country_n.currencies.filter(code=currency['code']).exists() \
                        and Currency.objects.filter(code=currency['code']).exists():
                        country_n.currencies.add(Currency.objects.get(code=currency['code']))
                    else:
                        self.log.info('Country: ' + country_n.name + ', Currency: ' + currency['code'])
