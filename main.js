import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';
dotenv.config();
const token = process.env.BOT_TOKEN;
//client instance
const client = new Client({ intents: [GatewayIntentBits] });
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready ! logged in as ${readyClient.user.tag}`)
})
client.login(token)
