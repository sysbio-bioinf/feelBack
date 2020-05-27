import { Command, Console } from 'nestjs-console';

@Console()
export class EchoCommand {
  @Command({
    command: 'echo <text>',
    description: 'outputs your input',
  })
  async echoOutput(text: string): Promise<void> {
    console.log(`talking back: ${text}.`);
  }
}
