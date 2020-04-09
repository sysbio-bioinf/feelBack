import { Injectable } from '@angular/core';
import { isAndroid } from '@cancerlog/utils';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private FEELBACK_DIRECTORY = 'feelback';

  constructor(private fileSystem: File) {}

  private getBaseDirectory(): string {
    if (isAndroid()) {
      return this.fileSystem.externalDataDirectory;
    } else {
      console.error('Find me in StorageService');
      throw new Error('Device not found');
    }
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
