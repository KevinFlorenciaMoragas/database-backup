const fs = require('fs');
const archiver = require('archiver');
const { connectToDatabase } = require('../services/database');

export async function backupDatabase(type: string) {
    console.log(`Starting ${type} backup...`);

    try {
        const db = await connectToDatabase(type);
        const backupFile = `backup_${Date.now()}.zip`;
        const output = fs.createWriteStream(backupFile);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`Backup completed: ${backupFile} (${archive.pointer()} total bytes)`);
        });

        archive.on('error', (err: Error) => {
            throw err;
        });

        archive.pipe(output);

        let backupData: { [key: string]: any } = {};

        if (type === 'mysql' || type === 'postgresql') {
            const tablesQuery = type === 'mysql' 
                ? "SHOW TABLES" 
                : "SELECT table_name FROM information_schema.tables WHERE table_schema='public'";
            console.log(tablesQuery)
            const [tables] = await db.query(tablesQuery);
            console.log(tables)
            for (const row of tables) {
                const tableName = type === 'mysql' ? row[`Tables_in_${process.env.DB_NAME}`] : row.table_name;
                const [tableData] = await db.query(`SELECT * FROM ${tableName}`);
                backupData[tableName] = tableData;
            }

        } else if (type === 'mongodb') {
            const collections = await db.listCollections().toArray();
            for (const collection of collections) {
                const collectionName = collection.name;
                const data = await db.collection(collectionName).find().toArray();
                backupData[collectionName] = data;
            }

        } else if (type === 'sqlite') {
            const tablesQuery = "SELECT name FROM sqlite_master WHERE type='table'";
            const tables = await db.all(tablesQuery);
            
            for (const row of tables) {
                const tableName = row.name;
                const tableData = await db.all(`SELECT * FROM ${tableName}`);
                backupData[tableName] = tableData;
            }
        }

        archive.append(JSON.stringify(backupData, null, 2), { name: 'backup.json' });

        await archive.finalize();
        console.log("Proceso de backup finalizado con exito")
        process.exit(1)
    } catch (error) {
    if (error instanceof Error) {
        console.error('Error during backup:', error.message);
    } else {
        console.error('Error during backup:', error);
    }
    process.exit(1);
}
}
