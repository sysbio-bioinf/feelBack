import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { TranslatableError } from '../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private FEELBACK_DIRECTORY = 'feelback';

  constructor(private platform: Platform, private fileSystem: File) {}

  private getBaseDirectory(): string {
    if (this.platform.is('android')) {
      return this.fileSystem.externalRootDirectory + 'Download/';
    } else {
      throw new TranslatableError('app.errors.services.storage.device');
    }
  }

  async createFeelbackDirectories() {
    const baseDir = this.getBaseDirectory();

    try {
      await this.fileSystem
        .createDir(baseDir, this.FEELBACK_DIRECTORY, false)
        .then(() => {
          console.log('feelback download dir created');
        })
        .catch((error) => {
          // TODO: Verify error difference when there is a real error (e.g., permission error?)
          // if this error can be distinguished from the "directory already exists" error, it is fine.
          // Else, this should be implemented in a different way - maybe use checkDir again?
          // currently, the storage.create translatable error can not be thrown.
          console.log(error);
          console.log('feelback download dir already exists');
        });
    } catch (error) {
      console.error(error);
      throw new TranslatableError('app.errors.services.storage.create');
    }
  }

  async writeDataToFile(filename: string, data: string) {
    const baseDir = this.getBaseDirectory();
    const dir = baseDir + this.FEELBACK_DIRECTORY;

    try {
      await this.fileSystem.writeFile(dir, filename, data, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      throw new TranslatableError('app.errors.services.storage.write');
    }
  }
}
