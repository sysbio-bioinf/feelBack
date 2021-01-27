import { of } from 'rxjs';
import { Identity } from '../../graphql/generated/feelback.graphql';
import { IdentityService } from './identity.service';

describe('IdentityService test', () => {
  let identityService: IdentityService;

  const identityReturnMock = {
    data: {
      identityByPseudonym: <Partial<Identity>>{
        id: 'dummyID',
        version: 1,
        pseudonym: 'pseudoMock',
        title: 'none',
      },
    },
  };

  const getIdentityByPseudonymGQLMock = {
    fetch: jest.fn(({ pseudonym: string }) => of({})),
  };

  beforeEach(() => {
    identityService = new IdentityService(getIdentityByPseudonymGQLMock as any);
  });

  it('should get the Identity by pseudonym', async () => {
    getIdentityByPseudonymGQLMock.fetch.mockReturnValueOnce(
      of(identityReturnMock),
    );
    let identity = await identityService.getIdentityByPseudonym('pseudoMock');
    expect(identity).toEqual(identityReturnMock.data.identityByPseudonym);
    getIdentityByPseudonymGQLMock.fetch.mockReturnValueOnce(
      of(new Error('error')),
    );
    let error;
    identity = null;
    try {
      identity = await identityService.getIdentityByPseudonym('pseudoMock');
    } catch (e) {
      error = e;
    }
    expect(error.name).toEqual('TranslatableError');
    expect(error.message).toEqual('app.errors.services.identity.notFound');
    expect(identity).toBe(null);
  });
});
