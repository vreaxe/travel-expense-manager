from django.apps import AppConfig


class TripConfig(AppConfig):
    name = 'backend.trip'

    def ready(self):
        import backend.trip.signals
