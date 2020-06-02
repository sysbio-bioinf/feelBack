import { ApiPathHelper } from './api-path.helper';
import * as path from 'path';

describe('ApiPathHelper', () => {
  it('should create valid paths', async () => {
    const basePath = ApiPathHelper.basePath('foo');
    expect(basePath).toContain(`apps${path.sep}foo`);

    const srcPath = ApiPathHelper.srcPath('foo');
    expect(srcPath).toContain(`apps${path.sep}foo${path.sep}src`);

    const appPath = ApiPathHelper.appPath('foo');
    expect(appPath).toContain(`apps${path.sep}foo${path.sep}src${path.sep}app`);

    const modulesPath = ApiPathHelper.modulesPath('foo');
    expect(modulesPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}app${path.sep}modules`,
    );

    const moduleAPath = ApiPathHelper.modulePath('foo', 'a');
    expect(moduleAPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}app${path.sep}modules${path.sep}a`,
    );

    const envPath = ApiPathHelper.envPath('foo');
    expect(envPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}environments`,
    );

    const assetsPath = ApiPathHelper.assetsPath('foo');
    expect(assetsPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}assets`,
    );

    const dbPath = ApiPathHelper.dbPath('foo');
    expect(dbPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}database`,
    );

    const migrationsPath = ApiPathHelper.migrationsPath('foo');
    expect(migrationsPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}database${path.sep}migrations`,
    );

    const seedsPath = ApiPathHelper.seedsPath('foo');
    expect(seedsPath).toContain(
      `apps${path.sep}foo${path.sep}src${path.sep}database${path.sep}seeds`,
    );
  });
});
