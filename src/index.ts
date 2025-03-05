const { Command } = require('commander');
const dotenv = require('dotenv');
const { backupDatabase } = require('./commands/backup');
const { restoreDatabase } = require('./commands/restore');

dotenv.config();

const program = new Command();

program
    .name('db-backup-cli')
    .description('CLI tool for database backup and restore operations')
    .version('1.0.0');

program
    .command('backup')
    .description('Create a backup of the specified database')
    .option('-t, --type <type>', 'Type of backup (full, incremental, differential)', 'full')
    .action(async (options: any) => {
        try {
            await backupDatabase(options.type);
            console.log('Backup completed successfully.');
        } catch (error) {
            const err = error as Error;
            console.error('Error during backup:', err.message);
            process.exit(1);
        }
    });

program
    .command('restore')
    .description('Restore a backup of the specified database')
    .requiredOption('-f, --file <file>', 'Path to the backup file')
    .action(async (options: any) => {
        try {
            await restoreDatabase(options.file);
            console.log('Restore completed successfully.');
        } catch (error) {
            const err = error as Error;
            console.error('Error during restore:', err.message);
            process.exit(1);
        }
    });

program.parse(process.argv);