import fs from 'fs';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const { DISCORD_BOT_TOKEN, DISCORD_APP_ID } = process.env;
const SERVER_ID = '1171416095790465078';

const commands = [];

const foldersPath = new URL('commands', import.meta.url);
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const folderPath = `commands/${folder}`;
  const commandsPath = new URL(folderPath, import.meta.url);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = `commands/${folder}/${file}`;
    const commandFile = new URL(filePath, import.meta.url);
    const command = (await import(commandFile)).default;
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_BOT_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationGuildCommands(DISCORD_APP_ID, SERVER_ID), { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
