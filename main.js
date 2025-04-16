import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { REST, Routes, Events, MessageFlags } from 'discord.js';
import { config } from './config/config.js';
import { client } from './config/client.js';
import { dataSource } from './config/db.js';

const token = config.dc.token;
const clientId = config.dc.client_id;
const guildId = config.dc.guild_id;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = await import(`file://${filePath}`);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } else {
      console.warn(`[WARN] Command at ${filePath} is missing "data" or "execute".`);
    }
  }
}

// Register Slash Commands
const rest = new REST().setToken(token);
(async () => {
  try {
    console.log(`🔁 Registering ${commands.length} slash commands...`);
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log(`✅ Registered ${data.length} commands.`);
  } catch (err) {
    console.error(err);
  }
})();

// Connect to DB and login
client.once(Events.ClientReady, async readyClient => {
  try {
    await dataSource.initialize();
    console.log('📦 Database connected');
  } catch (err) {
    console.error('❌ Database init error:', err);
  }

  console.log(`✅ Logged in as ${readyClient.user.tag}`);
});

// Handle interactions
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    const replyData = {
      content: 'There was an error while executing this command!',
      flags: MessageFlags.Ephemeral,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(replyData);
    } else {
      await interaction.reply(replyData);
    }
  }
});

client.login(token);
