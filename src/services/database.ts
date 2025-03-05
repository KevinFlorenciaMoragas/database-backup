const mysql = require('mysql2/promise');
const {Client } = require('pg');
const {MongoClient} = require('mongodb');
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const dotenv = require('dotenv');
dotenv.config();

export async function connectToDatabase(dbType:string) {
    try{
        console.log(dbType)
        console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME)
        switch(dbType){
            case 'mysql':
                return mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    port: process.env.DB_PORT
                })
            
            case 'postgresql':
                const pgClient = new Client({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    port: process.env.DB_PORT
                })
                await pgClient.connect()
                return pgClient;
            case 'mongodb':
                const mongoClient = new MongoClient(process.env.DB_URI as string);
                await mongoClient.connect()
                return mongoClient.db()
            case 'sqlite':
                return open({
                    filename: process.env.DB_FILE as string,
                    driver: sqlite3.Database,
                });
            default:
                throw new Error('Unsupported database type')
            }
    }catch (error){
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}