import { User } from '@feelback-app/api/auth';

export const mockRequest = {
  user: new User('requestId'),
};

export const mockGqlExecutionContext = {
  getContext: () => ({
    req: mockRequest,
  }),
};
