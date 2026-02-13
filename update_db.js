const { Client } = require('pg');
const fs = require('fs');
const { parse } = require('url');

async function run() {
    // Read .env.local to get POSTGRES_URL
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const match = envFile.match(/POSTGRES_URL="(.+?)"/);
    if (!match) {
        console.error('POSTGRES_URL not found in .env.local');
        process.exit(1);
    }
    const connectionString = match[1].trim();

    // Custom parser for postgres connection string
    // Format: postgresql://user:password@host:port/database
    // We handle the password carefully as it might contain special characters

    let config = {};
    const parts = connectionString.match(/postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)/);

    if (parts) {
        config = {
            user: parts[1],
            password: parts[2],
            host: parts[3],
            port: parseInt(parts[4]),
            database: parts[5],
            ssl: {
                rejectUnauthorized: false
            }
        };
        console.log(`Parsed config: user=${config.user}, host=${config.host}, port=${config.port}, db=${config.database}`);
    } else {
        console.error('Failed to parse connection string format.');
        // Fallback to library parser but with SSL
        config = {
            connectionString,
            ssl: { rejectUnauthorized: false }
        };
    }

    const client = new Client(config);

    try {
        await client.connect();
        console.log('Connected to database!');

        const sql = fs.readFileSync('supabase_update.sql', 'utf8');
        console.log('Running SQL update...');

        await client.query(sql);

        console.log('Update successful!');
    } catch (err) {
        console.error('Error executing update:', err);
    } finally {
        await client.end();
    }
}

run();
