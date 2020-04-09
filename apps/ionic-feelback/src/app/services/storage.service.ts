import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { isAndroid } from '@cancerlog/utils';
import * as path from 'path';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private FEELBACK_DIRECTORY = 'feelback';
  private JSON_DIRECTORY = 'json';
  private HTML_DIRECTORY = 'html';

  constructor(private fileSystem: File) {}

  private getBaseDirectory(): string {
    if (isAndroid()) {
      return this.fileSystem.externalDataDirectory;
    } else {
      console.error('Find me in StorageService');
      throw new Error('Device not found');
    }
  }

  async createResultDirectories() {
    const baseDir = this.getBaseDirectory();

    this.fileSystem
      .checkDir(baseDir, this.JSON_DIRECTORY)
      .then(async () => {
        console.log('json dir exists');
      })
      .catch(async (error) => {
        await this.fileSystem.createDir(baseDir, this.JSON_DIRECTORY, true);
        console.log('json dir created');
      });

    this.fileSystem
      .checkDir(baseDir, this.HTML_DIRECTORY)
      .then(() => {
        console.log('pdf dir exists');
      })
      .catch(async (error) => {
        await this.fileSystem.createDir(baseDir, this.HTML_DIRECTORY, true);
        console.log('pdf dir created');
      });
  }

  async writeDataToFile(filename: string, data: string) {
    const baseDir = this.getBaseDirectory();
    const dir = path.join(baseDir, this.FEELBACK_DIRECTORY);

    await this.fileSystem.writeFile(dir, filename, data, {
      replace: true,
    });
  }

  async writeResultsToJSON(data: object) {
    const now = new Date();
    const filename = this.buildFileName(now) + '.json';
    const baseDir = this.getBaseDirectory();

    const dir = baseDir + this.JSON_DIRECTORY;

    await this.fileSystem.writeFile(dir, filename, JSON.stringify(data), {
      replace: true,
    });
  }

  async writeResultsToHTML(data: string) {
    const now = new Date();
    const filename = this.buildFileName(now) + '.html';
    const baseDir = this.getBaseDirectory();

    const dir = baseDir + this.HTML_DIRECTORY;

    await this.fileSystem.writeFile(dir, filename, data, { replace: true });
  }

  private buildFileName(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }

  // print(data: any, options?: PrintOptions) {
  //   this.printer.isAvailable().then((success) => {
  //     this.printer.print(data, options).then(() => {
  //       console.log('file printed');
  //     });
  //   });
  // }
}
