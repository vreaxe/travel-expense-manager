from django.core.exceptions import ValidationError

def validate_date_range(start, end, date, field_name):
    if not start <= date <= end:
        raise ValidationError({field_name: '{} should be between two dates.'.format(field_name.capitalize())})
