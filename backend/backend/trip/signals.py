from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from backend.trip.models import Trip, TripCategory

@receiver(post_save, sender=Trip)
def create_trip(sender, instance, created, **kwargs):
    if created:
        for trip_category in settings.DEFAULT_TRIP_CATEGORIES:
            TripCategory.objects.create(
                name=trip_category,
                trip_id=instance.id
            )
