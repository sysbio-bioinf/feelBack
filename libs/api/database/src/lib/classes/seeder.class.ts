export abstract class Seeder {
  abstract seed(): Promise<void>;
}
