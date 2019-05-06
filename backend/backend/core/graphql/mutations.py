import graphene
from graphql import GraphQLError
from graphql_jwt.shortcuts import get_token
from graphql_jwt import JSONWebTokenMutation
from django.core.exceptions import ValidationError as DjangoValidationError

from backend.graphql.exceptions import ValidationError
from backend.core.models import User
from backend.core.graphql.types import UserType


class AuthenticationUserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class RegisterUser(graphene.Mutation):
    class Arguments:
        input = AuthenticationUserInput(required=True)

    class Meta:
        description = 'Register new user'

    token = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, input):
        user_exists = User.objects.filter(email=input['email']).exists()
        if not user_exists:
            try:
                user = User.objects.create_user(input['email'], input['password'])
                token = get_token(user)
                return RegisterUser(token=token, user=user)
            except DjangoValidationError as django_validation_error:
                raise ValidationError(form_errors=django_validation_error.message_dict)
        else:
            raise ValidationError(form_errors={'email': "This email is already taken."})


class ObtainJSONWebToken(JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)
