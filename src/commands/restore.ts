const fs = require('fs');
const { connectToDatabase } = require('../services/database');

export async function restoreDatabase(type: string, backupFile: string) {
    console.log(`Restoring ${type} database from ${backupFile}...`);
    
    try {
        const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        const db = await connectToDatabase(type);

        switch (type) {
            case 'mysql':
            case 'postgresql':
                for (const table in backupData) {
                    const columns = Object.keys(backupData[table][0]).join(', ');
                    const values = backupData[table].map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => `(${Object.values(row).map(val => `'${val}'`).join(', ')})`).join(', ');
                    await db.query(`INSERT INTO ${table} (${columns}) VALUES ${values}`);
                }
                console.log(`${type} database restored successfully!`);
                break;

            case 'mongodb':
                for (const collection in backupData) {
                    const col = db.collection(collection);
                    await col.insertMany(backupData[collection]);
                }
                console.log('MongoDB database restored successfully!');
                break;

            case 'sqlite':
                for (const table in backupData) {
                    const columns = Object.keys(backupData[table][0]).join(', ');
                    const values = backupData[table].map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => `(${Object.values(row).map(val => `'${val}'`).join(', ')})`).join(', ');
                    await db.run(`INSERT INTO ${table} (${columns}) VALUES ${values}`);
                }
                console.log('SQLite database restored successfully!');
                break;

            default:
                throw new Error('Unsupported database type');
        }
    } catch (error) {
        console.error('Error during restoration:', error);
        process.exit(1);
    }
}
