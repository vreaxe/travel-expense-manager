import decimal

from graphene.types import Scalar
from graphql.language import ast

# See: https://github.com/graphql-python/graphene-django/issues/91#issuecomment-305542169
class Decimal(Scalar):
    """
    The `Decimal` scalar type represents a python Decimal.
    """
    @staticmethod
    def serialize(dec):
        assert isinstance(dec, decimal.Decimal), (
            'Received not compatible Decimal "{}"'.format(repr(dec))
        )
        return str(dec)

    @staticmethod
    def parse_value(value):
        return decimal.Decimal(value)

    @classmethod
    def parse_literal(cls, node):
        if isinstance(node, ast.StringValue):
            return cls.parse_value(node.value)
