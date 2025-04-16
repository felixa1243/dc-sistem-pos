import dotenv from 'dotenv';
dotenv.config();
export const config = {
    db: {
        database_type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        db_name: process.env.DB_NAME,
    },
    dc: {
        token: process.env.BOT_TOKEN,
        client_id: process.env.CLIENT_ID,
        guild_id: process.env.GUILD_ID,
    }
}