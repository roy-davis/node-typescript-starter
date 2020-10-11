require('dotenv').config();

export const config = {
    server_port: Number(process.env.SERVER_PORT) || 3000,
    name: process.env.NAME,
    host_id: process.env.HOST_ID,
    version: process.env.VERSION,
    loggerLevel: process.env.MODE,
    db: {
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
}
