import { Command } from 'commander';

export default function setupCommands(program: Command) {
  program
    .command('command1')
    .description('Description for command1')
    .action(() => {
      console.log('Command1 executed');
    });

  program
    .command('command2')
    .description('Description for command2')
    .action(() => {
      console.log('Command2 executed');
    });

  // Add more commands as needed
}