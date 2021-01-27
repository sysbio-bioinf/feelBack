import { StorageService } from './storage.service';

describe('StorageService test', () => {
  let storageService: StorageService;

  const FEELBACK_DIRECTORY = 'feelback';

  const platformMock = {
    is: jest.fn((platform: string) => true),
  };

  const fileSystemMock = {
    externalRootDirectory: '/mock/directory/',
    createDir: jest.fn(() => Promise.resolve({}) as any),
    writeFile: jest.fn(
      async (path: string, filename: string, text: string, options: any) =>
        Promise.resolve({}),
    ),
  };

  beforeEach(() => {
    storageService = new StorageService(
      platformMock as any,
      fileSystemMock as any,
    );
  });

  it('should check the platform', async () => {
    platformMock.is.mockReturnValueOnce(false);
    storageService = new StorageService(
      platformMock as any,
      fileSystemMock as any,
    );
    let error;
    try {
      await storageService.createFeelbackDirectories();
    } catch (e) {
      error = e;
    }
    expect(error.name).toEqual('TranslatableError');
    expect(error.message).toEqual('app.errors.services.storage.device');
  });

  it('should create FeelBack directories', async () => {
    await storageService.createFeelbackDirectories();
    // wait for fileSystem.createDir()
    await Promise.resolve();
    expect(fileSystemMock.createDir).toHaveBeenCalledWith(
      '/mock/directory/Download/',
      FEELBACK_DIRECTORY,
      false,
    );
  });

  it('should write data to file', async () => {
    expect(() =>
      storageService.writeDataToFile('fileName', 'fileContent'),
    ).not.toThrow();
    expect(fileSystemMock.writeFile).toHaveBeenCalledWith(
      '/mock/directory/Download/' + FEELBACK_DIRECTORY,
      'fileName',
      'fileContent',
      {
        replace: true,
      },
    );
  });
});
