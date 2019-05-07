import graphene
from graphene_django.types import DjangoObjectType

from backend.trip.models import Trip, TripUser

class TripUserType(DjangoObjectType):
    class Meta:
        model = TripUser

class TripType(DjangoObjectType):
    # Rename field trip_user to users
    users = graphene.List(TripUserType)

    @graphene.resolve_only_args
    def resolve_users(self):
        return self.trip_user.all()

    class Meta:
        model = Trip
        exclude_fields = ('trip_user',)
