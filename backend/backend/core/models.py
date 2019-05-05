from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.core.validators import MinValueValidator
from django.utils import timezone

from .mixins import TimestampsMixins
from .managers import UserManager


class Currency(TimestampsMixins):
    name = models.CharField(_('name'), max_length=50)
    name_plural = models.CharField(_('name plural'), max_length=50)
    code = models.CharField(_('code'), max_length=3)
    symbol = models.CharField(_('symbol'), max_length=200)
    symbol_native = models.CharField(_('symbol native'), max_length=200)
    decimal_digits = models.IntegerField(_('decimal digits'), validators=[MinValueValidator(0)])
    exchange_rate = models.DecimalField(_('exchange rate'), validators=[MinValueValidator(0.0001)], null=True, max_digits=20, decimal_places=4)

    class Meta:
        verbose_name = _('currency')
        verbose_name_plural = _('currencies')

    def __str__(self):
        return self.name


class Country(TimestampsMixins):
    name = models.CharField(_('name'), max_length=255)
    code = models.CharField(_('code'), max_length=2)
    alpha3 = models.CharField(_('aplha3'), max_length=3)
    flag_emoji = models.CharField(_('flag emoji'), max_length=200)
    latitude = models.DecimalField(max_digits=22, decimal_places=16)
    longitude = models.DecimalField(max_digits=22, decimal_places=16)
    currencies = models.ManyToManyField(Currency, related_name="countries")

    class Meta:
        verbose_name = _('country')
        verbose_name_plural = _('countries')

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin, TimestampsMixins):
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True, unique=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    base_currency = models.ForeignKey(Currency, null=True, on_delete=models.PROTECT,)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
