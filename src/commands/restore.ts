const fs = require('fs');
const { connectToDatabase } = require('../services/database');

export async function restoreDatabase(file: string) {
    console.log(`Restoring from ${file}...`);

    if (!fs.existsSync(file)) {
        console.log('Backup file not found!');
        process.exit(1);
    }

    const db = await connectToDatabase(process.env.DB_TYPE);

    // Read the backup file
    const backupData = fs.readFileSync(file, 'utf-8');

    // Restore the database with the backup data
    await db.restore(backupData);

    console.log(`Restore completed successfully.`);
}

