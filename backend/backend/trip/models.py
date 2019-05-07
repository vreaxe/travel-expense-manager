from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator

from backend.core.mixins import TimestampsMixins
from backend.core.models import Currency, Country, User
from backend.trip.constants import TripUserRoles


class Trip(TimestampsMixins):
    title = models.CharField(_('title'), max_length=255)
    budget = models.DecimalField(_('budget'), validators=[MinValueValidator(0.01)], max_digits=20, decimal_places=2)
    start_date = models.DateTimeField(_('start date'))
    end_date = models.DateTimeField(_('end date'))
    base_currency = models.ForeignKey(Currency, on_delete=models.PROTECT, related_name='trips')
    countries = models.ManyToManyField(Country, related_name="trips")
    users = models.ManyToManyField(User, related_name="trips", through='TripUser')

    class Meta:
        verbose_name = _('trip')
        verbose_name_plural = _('trips')

    def __str__(self):
        return self.title


class TripUser(TimestampsMixins):
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT, related_name='trip_user')
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='trip_user')
    role = models.CharField(_('role'), max_length=100, choices=TripUserRoles.values)

    class Meta:
        db_table = 'trip_trip_user'
        verbose_name = _('trip user')
        verbose_name_plural = _('trips users')