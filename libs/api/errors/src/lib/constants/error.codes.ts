export const EC_GENERAL_ERROR = {
  code: 'api.general.001',
  description: 'Something went wrong - no further information is provided.',
};

export const EC_GENERAL_CONFLICT = {
  code: 'api.general.409',
  description: 'Conflict',
};

export const EC_GENERAL_NOTFOUND = {
  code: 'api.general.404',
  description: 'The requested resource was not found.',
};

export const EC_VALIDATION_FAILED = {
  code: 'api.validation.failed',
  description: 'Validation of resource or parameters failed.',
};

export const EC_KEYCLOAK_RESOLVE_USER = {
  code: 'keycloak.resolve.001',
  description: 'Error when trying to resolve a User from the KeyCloak Server.',
};

export const EC_KEYCLOAK_REQUEST_TOKEN = {
  code: 'keycloak.resolve.002',
  description: 'Error when trying to issue a Token from the KeyCloak Server.',
};

export const EC_KEYCLOAK_INVALIDSIGNINGKEY = {
  code: 'keycloak.general.001',
  description:
    'The Signing Key for validating / creating the signature was not found.',
};

export const EC_AUTH_MISSING_JWT = {
  code: 'auth.jwt.001',
  description:
    'Invalid or missing JWT Access Token. Maybe you are missing the BEARER type?',
};

export const EC_AUTH_ROLE_BEFORE_JWT_GUARD = {
  code: 'auth.jwt.002',
  description:
    'Cannot resolve a user from JWT. Did you accidentally call the RoleGuard before the AuthGuard?',
};

export const EC_AUTH_NOT_VERIFIED = {
  code: 'auth.user.001',
  description: 'The user is not (yet) verified.',
};
