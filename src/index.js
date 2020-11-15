const {Command, flags } = require('@oclif/command');
const appicon = require('./appicon');

class SharpAppiconCommand extends Command {
  async run() {
    const {flags, args } = this.parse(SharpAppiconCommand)
    const filename = args.iconfile || 'Appicon.png';
    appicon(filename);
  }
}

SharpAppiconCommand.description = `Use this command to generate Appicons for your Android and iOS applications
...
To generate and set of appicons for your mobile app, simply type appicon and the name of your png file.
`;

SharpAppiconCommand.examples = [
  `$ appicon myicon.png
████████████████████████████████████████ 100% | ETA: 0s | 73/73
`
];

SharpAppiconCommand.args = [
  {name: 'iconfile'}
];

SharpAppiconCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'})
};

module.exports = SharpAppiconCommand;
