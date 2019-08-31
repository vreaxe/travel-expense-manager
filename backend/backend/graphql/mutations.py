import graphene
from graphene.types.mutation import MutationOptions
from django.core.exceptions import ValidationError as DjangoValidationError

from backend.graphql.exceptions import PermissionDenied
from backend.graphql.exceptions import ValidationError

class CustomMutationOptions(MutationOptions):
    editable_fields = []

# Based on BaseMutation: https://github.com/mirumee/saleor/blob/master/saleor/graphql/core/mutations.py
class BaseMutation(graphene.Mutation):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(
        cls,
        arguments=None,
        description=None,
        editable_fields=(),
        _meta=None,
        **options
    ):
        if not _meta:
            _meta = CustomMutationOptions(cls)
            _meta.editable_fields = editable_fields

        super().__init_subclass_with_meta__(_meta=_meta, **options)

    @classmethod
    def mutate(cls, root, info, **data):
        try:
            return cls.perform_mutation(root, info, **data)
        except DjangoValidationError as django_validation_error:
            raise ValidationError(form_errors=django_validation_error.message_dict)

    @classmethod
    def perform_mutation(cls, root, info, **data):
        pass
