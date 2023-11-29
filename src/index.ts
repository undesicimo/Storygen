import { Command } from 'commander';
import setupCommands from './commands';

const program = new Command();

program
  .version('0.0.1')
  .description('My CLI Tool');

setupCommands(program);

program.parse(process.argv);