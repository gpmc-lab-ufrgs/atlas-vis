import chalk from 'chalk';

export namespace logging {
  // info
  export const info = (message: string) => {
    console.log(chalk.blue(`ℹ️ ${message}`));
  };

  // error
  export const error = (message: string) => {
    console.log(chalk.red(`❌ ${message}`));
  };

  // warning
  export const warning = (message: string) => {
    console.log(chalk.yellow(`🚧 ${message}`));
  };

  // success
  export const success = (message: string) => {
    console.log(chalk.green(`✅ ${message}`));
  };

  // debug
  export const debug = (message: string) => {
    console.log(chalk.gray(`⚙️ ${message}`));
  };
}
