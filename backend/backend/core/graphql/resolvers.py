import graphene
from graphene_django.types import ObjectType

from backend.core.graphql.types import CurrencyType
from backend.core.models import Currency
from backend.graphql.exceptions import NotFoundError

def resolve_currencies(info):
    return Currency.objects.all()

def resolve_currency(info, id=None, code=None):
    assert id or code, 'Id or code are required.'

    if id is not None:
        return Currency.objects.get(id=id)
    elif code is not None:
        return Currency.objects.get(code=code)
    else:
        raise NotFoundError()
