import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private FEELBACK_DIRECTORY = 'feelback';

  constructor(private platform: Platform, private fileSystem: File) {}

  private getBaseDirectory(): string {
    if (this.platform.is('android')) {
      return this.fileSystem.externalRootDirectory + '/Download/';
    } else {
      console.error('Find me in StorageService');
      throw new Error('Device not found');
    }
  }

  async createFeelbackDirectories() {
    const baseDir = this.getBaseDirectory();

    this.fileSystem
      .checkDir(baseDir, this.FEELBACK_DIRECTORY)
      .then(async () => {
        console.log('feelback download dir already exists');
      })
      .catch(async (error) => {
        await this.fileSystem.createDir(baseDir, this.FEELBACK_DIRECTORY, true);
        console.log('feelback download dir created');
      });
  }

  async writeDataToFile(filename: string, data: string) {
    const baseDir = this.getBaseDirectory();
    const dir = baseDir + this.FEELBACK_DIRECTORY;

    await this.fileSystem.writeFile(dir, filename, data, {
      replace: true,
    });
  }

  // print(data: any, options?: PrintOptions) {
  //   this.printer.isAvailable().then((success) => {
  //     this.printer.print(data, options).then(() => {
  //       console.log('file printed');
  //     });
  //   });
  // }
}
