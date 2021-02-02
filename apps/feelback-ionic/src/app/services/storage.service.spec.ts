import { TranslatableError } from '../core/customErrors/translatableError';
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
    // handle errors
    // this "error case" is not really an errors and just logs to console
    fileSystemMock.createDir.mockReturnValueOnce(
      Promise.reject('createDir error'),
    );
    expect(storageService.createFeelbackDirectories()).resolves.not.toThrow();
    // TODO: Add test for translatable error as soon as it is verified.
  });

  it('should write data to file', async () => {
    expect(async () =>
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
    fileSystemMock.writeFile.mockRejectedValueOnce(
      new Error('writeFile mock error'),
    );
    try {
      await storageService.writeDataToFile('fileName', 'fileContent');
    } catch (error) {
      expect(error instanceof TranslatableError).toBe(true);
      expect(error.message).toEqual('app.errors.services.storage.write');
    }
  });
});
