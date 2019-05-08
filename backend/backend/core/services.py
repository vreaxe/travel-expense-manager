from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _

from backend.core.models import Currency, Country
from backend.graphql.exceptions import ValidationError

def get_currency(currency_id, field_name='currency'):
    try:
        currency = Currency.objects.get(id=currency_id)
        return currency
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Currency not found'}
        )

def get_country(country_id, field_name='country'):
    country = None
    try:
        country = Country.objects.get(id=country_id)
        return country
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Country not found'}
        )

def get_countries(countries_ids, field_name='countries'):
    list_countries = []
    for country_id in countries_ids:
        country = get_country(country_id, field_name)
        list_countries.append(country)
    return list_countries
