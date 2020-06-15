export abstract class Seeder {
  abstract async seed(): Promise<void>;
}
