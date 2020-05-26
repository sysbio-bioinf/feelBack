import * as path from 'path';

export class ApiPathHelper {
  /**
   * Return the base directory of the application
   */
  static basePath(app: string): string {
    return path.join(process.cwd(), 'apps', app);
  }

  /**
   * Returns the /src directory of the application
   */
  static srcPath(app: string): string {
    return path.join(this.basePath(app), 'src');
  }

  /**
   * Returns the /src directory of the application
   */
  static appPath(app: string): string {
    return path.join(this.srcPath(app), 'app');
  }

  static modulesPath(app: string): string {
    return path.join(this.srcPath(app), 'app', 'modules');
  }

  static modulePath(app: string, module: string): string {
    return path.join(this.modulesPath(app), module);
  }

  /**
   * Returns the /src directory of the application
   */
  static envPath(app: string): string {
    return path.join(this.srcPath(app), 'environments');
  }

  /**
   * Returns the /assets directory of the application
   */
  static assetsPath(app: string): string {
    return path.join(this.srcPath(app), 'assets');
  }

  static dbPath(app: string): string {
    return path.join(this.srcPath(app), 'database');
  }

  static migrationsPath(app: string): string {
    return path.join(this.dbPath(app), 'migrations');
  }

  static seedsPath(app: string): string {
    return path.join(this.dbPath(app), 'seeds');
  }
}
