from django.db import models
from django.utils.timezone import now
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator
from colorfield.fields import ColorField

from backend.core.mixins import TimestampsMixins
from backend.core.models import Currency, Country, User
from backend.trip.constants import TripUserRoles
from backend.core.validators import validate_date_range
from backend.trip.validators import validate_expense_created_by, validate_expense_category_belongs_to_trip


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
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='trip_user')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trip_user')
    role = models.CharField(_('role'), max_length=100, choices=TripUserRoles.values, default=TripUserRoles.DEFAULT)

    class Meta:
        db_table = 'trip_trip_user'
        verbose_name = _('trip user')
        verbose_name_plural = _('trips users')

    def __str__(self):
        return self.user.email + ' - ' + self.trip.title


class TripCategory(TimestampsMixins):
    name = models.CharField(_('name'), max_length=255)
    color = ColorField(_('color'), max_length=255, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='categories')

    class Meta:
        db_table = 'trip_trip_category'
        verbose_name = _('trip category')
        verbose_name_plural = _('trips categories')

    def __str__(self):
        return self.name


class Expense(TimestampsMixins):
    title = models.CharField(_('title'), max_length=255)
    amount = models.DecimalField(_('amount'), validators=[MinValueValidator(0.01)], max_digits=20, decimal_places=2)
    date = models.DateTimeField(_('date'), default=now)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='expenses')
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT, related_name='expenses')
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='expenses')
    category = models.ForeignKey(TripCategory, on_delete=models.CASCADE, related_name='expenses', null=True)

    class Meta:
        verbose_name = _('expense')
        verbose_name_plural = _('expenses')

    def __str__(self):
        return self.title

    def clean(self, *args, **kwargs):
        validate_date_range(self.trip.start_date, self.trip.end_date, self.date, 'date')
        validate_expense_created_by(self.trip.id, self.created_by)
        validate_expense_category_belongs_to_trip(self.trip.id, self.category.id)
        super(Expense, self).clean(*args, **kwargs)
