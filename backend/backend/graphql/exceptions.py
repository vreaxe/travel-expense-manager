import operator
from functools import reduce

from django.utils.translation import ugettext_lazy as _


# Modified version of https://github.com/flavors/django-graphql-extensions
class GraphQLError(Exception):
    default_message = _('A server error occurred')
    default_code = 'ERROR'

    def __init__(self, message=None, code=None, **extensions):
        if message is None:
            message = self.default_message

        if code is None:
            code = self.default_code

        self.code = code
        self.extensions = extensions

        super().__init__(message)


class ValidationError(GraphQLError):
    default_message = _('Invalid input')
    default_code = 'INVALID'

    def __init__(self, message=None, code=None, **extensions):
        if 'form_errors' in extensions:
            form_errors = extensions['form_errors']

            if not isinstance(form_errors, list):
                form_errors = [form_errors]

            # https://stackoverflow.com/a/45649266
            extensions['form_errors'] = {
                k: [d.get(k) for d in form_errors if d.get(k) is not None]
                for k in set().union(*form_errors)
            }

        super().__init__(message, code, **extensions)


class NotFoundError(GraphQLError):
    default_message = _('Item not found')
    default_code = 'NOT_FOUND'
