import dotenv from 'dotenv';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags, REST, Routes } from 'discord.js';

dotenv.config();
const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
// Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct client with intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Ready event
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Command loading
client.commands = new Collection();
const commands = [];
//grab all the commands file from folder
const folderPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(folderPath);

for (const folder of commandsFolder) {
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(`file://${filePath}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }
}
const rest = new REST().setToken(token);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`)
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )
        console.log(`Successfully reloaded ${data.length} application(/) commands`);
    } catch (error) {
        console.error(error)
    }
})()
// Interaction handler
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        const replyData = {
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral
        };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(replyData);
        } else {
            await interaction.reply(replyData);
        }
    }
});

client.login(token);
