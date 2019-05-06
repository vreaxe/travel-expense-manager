from backend.core.models import Currency, Country
from backend.graphql.exceptions import NotFoundError

def resolve_currencies(info):
    return Currency.objects.all()

def resolve_currency(info, id=None, code=None):
    assert id or code, 'Id or code are required.'

    if id is not None:
        return Currency.objects.get(id=id)
    elif code is not None:
        return Currency.objects.get(code=code)

def resolve_countries(info):
    return Country.objects.all()

def resolve_country(info, id=None, code=None):
    assert id or code, 'Id or code are required.'

    if id is not None:
        return Country.objects.get(id=id)
    elif code is not None:
        return Country.objects.get(code=code)
