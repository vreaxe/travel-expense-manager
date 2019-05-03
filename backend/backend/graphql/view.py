import traceback
from collections import OrderedDict

from django.conf import settings

from graphene_django.views import GraphQLView as BaseGraphQLView
from graphql.error import GraphQLError
from graphql.error import format_error as format_graphql_error
from graphql.error.located_error import GraphQLLocatedError

from backend.graphql import exceptions


# Modified version of https://github.com/flavors/django-graphql-extensions
class GraphQLView(BaseGraphQLView):
    @staticmethod
    def format_error(error):
        if isinstance(error, GraphQLLocatedError):
            error = error.original_error

        formatted_error = format_graphql_error(error)
        graphql_error = OrderedDict([('type', error.__class__.__name__)])

        graphql_error['extensions'] = {}
        graphql_error['message'] = formatted_error['message']

        if isinstance(error, exceptions.GraphQLError):
            if error.extensions:
                graphql_error['extensions'] = error.extensions

            graphql_error['extensions']['code'] = error.code
        else:
            graphql_error['extensions']['code'] = 'ERROR'

        if 'location' in formatted_error:
            graphql_error['location'] = formatted_error['location']

        if error.__traceback__ is not None:
            info = error.__traceback__.tb_frame.f_locals.get('info')

            if info is not None:
                graphql_error['path'] = [info.field_name]
                graphql_error['operation'] = info.operation.operation

        if settings.DEBUG:
            graphql_error['extensions']['stacktraceback'] = traceback.format_list(
                traceback.extract_tb(error.__traceback__)
            )

        return graphql_error
