import graphene
from graphene_django.types import DjangoObjectType

from backend.core.models import User, Currency, Country


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ('password', )


class CurrencyType(DjangoObjectType):
    class Meta:
        model = Currency
        exclude_fields = ('trips', 'users', 'expenses',)


class CountryType(DjangoObjectType):
    class Meta:
        model = Country
        exclude_fields = ('trips',)
